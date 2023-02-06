import { useState, useEffect } from "react"
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import Spinner from '../components/Spinner'

import { MDBAccordion, MDBAccordionItem } from 'mdb-react-ui-kit';
import SearchBar from "../components/SearchBar"
import GroupItem from '../components/GroupItem'
import GruposForm from "../components/GruposForm"
import { getGroups, reset } from "../features/grupos/gruposSlice"

function Grupos() {
  const dispatch = useDispatch()
  const [search,setSearch] = useState('')
  
  const { grupos, isLoading, isError, message } = useSelector((state) => state.grupos)

  const [gruposfilter,setGruposFilter] = useState(grupos)

  const navigate = useNavigate()

  useEffect(()=>{
    
    if(isError){
      console.log(message)
      navigate('/login')
    }else{
      dispatch(getGroups())
    }

    return ()=>{
      dispatch(reset())
    }

  },[isError,message,dispatch])

  useEffect(() => {

    setGruposFilter((prevState)=>grupos.filter((grupo)=>{return Object.values(grupo).join('').toLowerCase().includes(search.toLowerCase())}))
    
  }, [search])

  useEffect(() => {
    setGruposFilter(grupos)
  }, [grupos])

    if(isLoading){
      return (
        <Spinner/>
      ) 
    }

  return (
    <>
      <MDBAccordion initialActive={0}>
        <MDBAccordionItem collapseId={1} headerTitle='Crear nuevo grupo'>
          <GruposForm/>
        </MDBAccordionItem>
      </MDBAccordion> 
      <br />
      <SearchBar setSearch={setSearch}/>
      <section className="content">
        {gruposfilter.length > 0 ? (
        <div>
          <div className="grupos">
            {gruposfilter.slice().sort((a,b)=> a.nombre.toUpperCase()>b.nombre.toUpperCase() ? 1:a.nombre.toUpperCase()<b.nombre.toUpperCase() ? -1:0).map((grupo)=>(
              <GroupItem key={grupo.id_grupo} grupo={grupo}/>
            ))}
          </div>
        </div>):(<h3>No hay ningun grupo</h3>)}
      </section>
      <br /><br />

    </>
  )
}

export default Grupos
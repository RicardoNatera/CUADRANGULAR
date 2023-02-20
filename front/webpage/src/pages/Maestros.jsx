import { useEffect,useState } from "react"
import { useSelector, useDispatch } from 'react-redux'
import Spinner from '../components/Spinner'
import { MDBAccordion, MDBAccordionItem, MDBTable, MDBTableHead, MDBTableBody } from 'mdb-react-ui-kit';

import { getTeachers, reset } from "../features/maestros/maestrosSlice"
import TeacherItem from "../components/TeacherItem"
import MaestrosForm from "../components/MaestrosForm"
import SearchBar from "../components/SearchBar"

function Maestros() {
  const dispatch = useDispatch()
  const [search,setSearch] = useState('')
  
  const { maestros, isLoading, isError, message } = useSelector((state) => state.maestros)

  const [maestrosfilter,setMaestrosFilter] = useState(maestros)
  
  useEffect(()=>{
    
    if(isError){
      console.log(message)
    }else{
      dispatch(getTeachers())
    }

    return ()=>{
      dispatch(reset())
    }

  },[isError,message,dispatch])

  useEffect(() => {
    
    setMaestrosFilter((prevState)=>maestros.filter((maestro)=>{return Object.values(maestro).join('').toLowerCase().includes(search.toLowerCase())}))
    
  }, [search])

  useEffect(() => {
    setMaestrosFilter(maestros)
  }, [maestros])

  if(isLoading){
    return (
      <Spinner/>
    ) 
  }
  
  return (
    <>
      <MDBAccordion initialActive={0}>
        <MDBAccordionItem collapseId={1} headerTitle='Ingresar nuevo maestro'>
          <MaestrosForm/>
        </MDBAccordionItem>
      </MDBAccordion> 
      <br />
      <SearchBar setSearch={setSearch}/>
      <section className="content">
        {maestrosfilter.length > 0 ? (
        <MDBTable align='middle' responsive>
        <MDBTableHead>
          <tr>
            <th scope='col'>Nombre</th>
            <th scope='col'>Cédula</th>
            <th scope='col'>Teléfono</th>
            <th scope='col'>Borrar</th>
          </tr>
        </MDBTableHead>
        <MDBTableBody>
            {maestrosfilter.slice().sort((a,b)=> a.nombre.toUpperCase()>b.nombre.toUpperCase() ? 1:a.nombre.toUpperCase()<b.nombre.toUpperCase() ? -1:0)
.map((maestro)=>(
              <TeacherItem key={`${maestro.id_maestro}_maestro`} maestro={maestro}/>
            ))}
        </MDBTableBody>
        </MDBTable>
          ):(<h3>No hay ningun maestro</h3>)}
      </section>
    </>
  )
}

export default Maestros
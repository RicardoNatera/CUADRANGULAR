import { useEffect,useState } from "react"
import { useSelector, useDispatch } from 'react-redux'
import Spinner from '../components/Spinner'
import { MDBAccordion, MDBAccordionItem } from 'mdb-react-ui-kit';

import { getCards, reset } from "../features/tarjetas/tarjetasSlice"
import CardItem from "../components/CardItem"
import TarjetasForm from "../components/TarjetasForm"
import SearchBar from "../components/SearchBar"

function Tarjetas() {
  const dispatch = useDispatch()
  const [search,setSearch] = useState('')
  
  const { tarjetas, isLoading, isError, message } = useSelector((state) => state.tarjetas)

  const [tarjetasfilter,setTarjetasFilter] = useState(tarjetas)
  
  useEffect(()=>{
    
    if(isError){
      console.log(message)
    }else{
      dispatch(getCards())
    }

    return ()=>{
      dispatch(reset())
    }

  },[isError,message,dispatch])

  useEffect(() => {
    
    setTarjetasFilter((prevState)=>tarjetas.filter((tarjeta)=>{return Object.values(tarjeta).join('').toLowerCase().includes(search.toLowerCase())}))
    
  }, [search])

  useEffect(() => {
    setTarjetasFilter(tarjetas)
  }, [tarjetas])

  if(isLoading){
    return (
      <Spinner/>
    ) 
  }
  return (
    <>
      <MDBAccordion initialActive={0}>
        <MDBAccordionItem collapseId={1} headerTitle='Ingresar nueva tarjeta'>
          <TarjetasForm/>
        </MDBAccordionItem>
      </MDBAccordion> 
      <br />
      <SearchBar setSearch={setSearch}/>
      <section className="content">
        {tarjetasfilter.length > 0 ? (
        <div>
          <div className="grupos">
            {tarjetasfilter.slice().sort((a,b)=> a.codigo.toUpperCase()>b.codigo.toUpperCase() ? 1:a.codigo.toUpperCase()<b.codigo.toUpperCase() ? -1:0)
.map((tarjeta)=>(
              <CardItem key={tarjeta.codigo} card={tarjeta}/>
            ))}
          </div>
        </div>):(<h3>No hay ninguna tarjeta</h3>)}
      </section>
    </>
  )
}

export default Tarjetas
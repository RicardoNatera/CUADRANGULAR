import { useEffect,useState } from "react"
import { useSelector, useDispatch } from 'react-redux'
import Spinner from '../components/Spinner'
import { MDBAccordion, MDBAccordionItem, MDBTable, MDBTableHead, MDBTableBody } from 'mdb-react-ui-kit';

import { getCards, reset } from "../features/tarjetas/tarjetasSlice"
import { getGroups, reset as resetGroups } from "../features/grupos/gruposSlice"
import { getTeachers, reset as resetTeachers } from "../features/maestros/maestrosSlice"

import CardItem from "../components/CardItem"
import TarjetasForm from "../components/TarjetasForm"
import SearchBar from "../components/SearchBar"

function Tarjetas() {
  const dispatch = useDispatch()
  const [search,setSearch] = useState('')
  
  const { tarjetas, isLoading, isError, message } = useSelector((state) => state.tarjetas)
  const { grupos,  isLoadingGrupos, isErrorGrupos, messageGrupos } = useSelector((state) => state.grupos)
  const { maestros,  isLoadingMaestros, isErrorMaestros, messageMaestros } = useSelector((state) => state.maestros)

  const [tarjetasfilter,setTarjetasFilter] = useState(tarjetas)
  
  useEffect(()=>{
    
    if(isError || isErrorGrupos || isErrorMaestros){
      console.log(message)
      console.log(messageGrupos)
      console.log(messageMaestros)
    }else{
      dispatch(getCards())
      dispatch(getGroups())
      dispatch(getTeachers())
    }

    return ()=>{
      dispatch(reset())
      dispatch(resetGroups())
      dispatch(resetTeachers())
    }

  },[isError,message,dispatch])

  useEffect(() => {
    
    setTarjetasFilter((prevState)=>tarjetas.filter((tarjeta)=>{return Object.values(tarjeta).join('').toLowerCase().includes(search.toLowerCase())}))
    
  }, [search])

  useEffect(() => {
    setTarjetasFilter(tarjetas)
  }, [tarjetas])

  if(isLoading || isLoadingGrupos || isLoadingMaestros){
    return (
      <Spinner/>
    ) 
  }

  return (
    <>
      <MDBAccordion initialActive={0}>
        <MDBAccordionItem collapseId={1} headerTitle='Ingresar nueva tarjeta'>
          <TarjetasForm Grupos={grupos} Maestros={maestros}/>
        </MDBAccordionItem>
      </MDBAccordion> 
      <br />
      <SearchBar setSearch={setSearch}/>
      <section className="content">
        {tarjetasfilter.length > 0 ? (
        <MDBTable align='middle' responsive>
        <MDBTableHead>
          <tr>
            <th scope='col'>&nbsp;&nbsp;&nbsp;&nbsp;Código&nbsp;&nbsp;&nbsp;&nbsp;</th>
            <th scope='col'>Grupo</th>
            <th scope='col'>Maestro</th>
            <th scope='col'>Acciones</th>
          </tr>
        </MDBTableHead>
        <MDBTableBody>
            {tarjetasfilter.slice().sort((a,b)=> a.codigo>b.codigo ? 1:a.codigo<b.codigo ? -1:0)
.map((tarjeta)=>(
              <CardItem key={tarjeta.codigo} card={tarjeta} grupo={grupos.find((grupo)=>grupo.id_grupo==tarjeta.id_grupo)} maestro={maestros.find((maestro)=>maestro.id_maestro==tarjeta.id_maestro)}/>
            ))}
          </MDBTableBody>
        </MDBTable>
          ):(<h3>No hay ninguna tarjeta</h3>)}
      </section>
    </>
  )
}

export default Tarjetas
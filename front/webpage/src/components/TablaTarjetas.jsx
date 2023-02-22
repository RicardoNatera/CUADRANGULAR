import { useState, useEffect } from "react"
import { useSelector, useDispatch } from 'react-redux'
import SearchBar from './SearchBar'
import Spinner from '../components/Spinner'

import { 
MDBTable, 
MDBTableHead, 
MDBTableBody 
} from 'mdb-react-ui-kit';

import { getCardsNoAuth, reset } from "../features/tarjetas/tarjetasSlice"
import { getGroupsNoAuth, reset as resetGroups } from "../features/grupos/gruposSlice"
import { getTeachersNoAuth, reset as resetTeachers } from "../features/maestros/maestrosSlice"


function TablaTarjetas() {
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
            dispatch(getCardsNoAuth())
            dispatch(getGroupsNoAuth())
            dispatch(getTeachersNoAuth())
        }

        return ()=>{
            dispatch(reset())
            dispatch(resetGroups())
            dispatch(resetTeachers())
        }

    },[isError,message,dispatch])

    useEffect(() => {
        if(search!=="")
            setTarjetasFilter((prevState)=>tarjetas.filter((tarjeta)=>{return Object.values(tarjeta).join('').toLowerCase().includes(search.toLowerCase())}))
        else
            setTarjetasFilter([])
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
        <SearchBar setSearch={setSearch}/>
        <MDBTable>
        <MDBTableHead>
            <tr>
            <th scope='col'>&nbsp;&nbsp;&nbsp;&nbsp;Código&nbsp;&nbsp;&nbsp;&nbsp;</th>
            <th scope='col'>Grupo</th>
            <th scope='col'>Maestro</th>
            </tr>
        </MDBTableHead>
        
        {tarjetasfilter.length > 0 && search!=="" ? (
        <MDBTableBody>
        {tarjetasfilter.slice().sort((a,b)=> a.codigo>b.codigo ? 1:a.codigo<b.codigo ? -1:0)
.map((tarjeta)=>(
                <tr key={tarjeta.codigo}>
                    
                <th scope='row'>{tarjeta.codigo}</th>
                <td>{(grupos.find((grupo)=>grupo.id_grupo==tarjeta.id_grupo)) ? (grupos.find((grupo)=>grupo.id_grupo==tarjeta.id_grupo)).nombre:'Sin Grupo'}</td>
                <td>{(maestros.find((maestro)=>maestro.id_maestro==tarjeta.id_maestro)) ? (maestros.find((maestro)=>maestro.id_maestro==tarjeta.id_maestro)).nombre+" "+(maestros.find((maestro)=>maestro.id_maestro==tarjeta.id_maestro)).apellido : "Sin maestro"}</td>
                
                    </tr>
            ))}
            </MDBTableBody>):(<MDBTableBody></MDBTableBody>)}
            
        </MDBTable>
        </>
    )
}

export default TablaTarjetas
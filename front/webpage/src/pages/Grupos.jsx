import { useEffect } from "react"
import { useSelector, useDispatch } from 'react-redux'
import Spinner from '../components/Spinner'

import GroupItem from '../components/GroupItem'
import GruposForm from "../components/GruposForm"
import { getGroups, reset } from "../features/grupos/gruposSlice"

function Grupos() {
  const dispatch = useDispatch()

  const { grupos, isLoading, isError, message } = useSelector((state) => state.grupos)

  useEffect(()=>{
    
    if(isError){
      console.log(message)
    }

    dispatch(getGroups())
    
    
    return ()=>{
      dispatch(reset())
    }

  },[isError,message,dispatch])

    if(isLoading){
      return (
        <Spinner/>
      ) 
    }

  return (
    <>
        <GruposForm/>
        <section className="content">
          {grupos.length > 0 ? (
          <div>
            <div className="grupos">
              {grupos.slice().sort((a,b)=> a.nombre.toUpperCase()>b.nombre.toUpperCase() ? 1:a.nombre.toUpperCase()<b.nombre.toUpperCase() ? -1:0).map((grupo)=>(
                <GroupItem key={grupo.id_grupo} grupo={grupo}/>
              ))}
            </div>
          </div>):(<h3>No hay ningun grupo</h3>)}
        </section>
    </>
  )
}

export default Grupos
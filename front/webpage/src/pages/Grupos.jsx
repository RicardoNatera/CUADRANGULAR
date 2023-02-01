import { useEffect } from "react"
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import Spinner from '../components/Spinner'

import GroupItem from '../components/GroupItem'
import GruposForm from "../components/GruposForm"
import { getGroups, reset } from "../features/grupos/gruposSlice"

function Grupos() {
    const navigate = useNavigate()
  const dispatch = useDispatch()

  const { user } = useSelector((state) => state.auth)
  const { grupos, isLoading, isError, message } = useSelector((state) => state.grupos)

  useEffect(()=>{
    
    if(isError){
      console.log(message)
    }
    
    if(!user){
      navigate('/login')
    }else{
      dispatch(getGroups())
    }
    return ()=>{
      dispatch(reset())
    }

  },[user,navigate,isError,message,dispatch])

    if(isLoading){
      return (
        <Spinner/>
      ) 
    }

  return (
    <>
        <section className="heading">
          <h1>Bienvenido {user && user.id}</h1>
          <p>Grupos Dashboard</p>
        </section>

        <GruposForm/>
        <section className="content">
          {grupos.length > 0 ? (
          <div>
            <div className="grupos">
              {grupos.map((grupo)=>(
                <GroupItem key={grupo.id_grupo} grupo={grupo}/>
              ))}
            </div>
          </div>):(<h3>No hay ningun grupo</h3>)}
        </section>
    </>
  )
}

export default Grupos
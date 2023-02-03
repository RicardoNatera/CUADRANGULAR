import { useEffect } from "react"
import { useSelector, useDispatch } from 'react-redux'
import Spinner from '../components/Spinner'

import { getAllUsers, reset } from "../features/auth/authSlice"
import UserItem from "../components/UserItem"

function Usuarios() {
  const dispatch = useDispatch()

  const { users, isLoading, isError, message } = useSelector((state) => state.auth)

  useEffect(()=>{
    
    if(isError){
      console.log(message)
    }
    dispatch(getAllUsers())
  
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
        <section className="content">
          {users.length > 0 ? (
          <div>
            <div className="grupos">
              {users.slice().sort((a,b)=> a.usuario.toUpperCase()>b.usuario.toUpperCase() ? 1:a.usuario.toUpperCase()<b.usuario.toUpperCase() ? -1:0)
.map((user)=>(
                <UserItem key={user.id} usuario={user}/>
              ))}
            </div>
          </div>):(<h3>No hay ningun usuario</h3>)}
        </section>
        <br /><br />
    </>
  )
}

export default Usuarios
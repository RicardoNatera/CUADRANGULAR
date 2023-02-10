import { useState, useEffect } from "react"
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import { getUser, reset } from "../features/auth/authSlice"

import Grupos from "./Grupos"
import Usuarios from "./Usuarios"
import Maestros from "./Maestros"
import Tarjetas from "./Tarjetas"

import Spinner from '../components/Spinner'
import NavbarDashboard from "../components/NavbarDashboard"

function Dashboard() {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const { user,  isLoadingUser, isErrorUser, messageUser } = useSelector((state) => state.auth)
  const [selected,setSelected] = useState(0)

  const dashboardComponents=[<Grupos/>,<Usuarios/>,<Maestros/>,<Tarjetas/>]

  useEffect(()=>{
    
    if(!user){
      navigate('/login')
    }

  },[user,navigate])

  useEffect(() => {
    
    if(isErrorUser){
      console.log(messageUser)
    }else{
      dispatch(getUser(user.id))
    }

    return ()=>{
      dispatch(reset())
    }
  
  }, [isErrorUser,messageUser,dispatch])
  
    
  if(isLoadingUser){
    return (
      <Spinner/>
    ) 
  }

    return (
      <>
        <section className="heading">
          <h1>Bienvenido { user && user.usuario || user && user.id }</h1>
          <p>Dashboard</p>
        </section>

        <NavbarDashboard selected={selected} setSelected={setSelected}/>
        
        {dashboardComponents[selected]}
        
      </>
    )
}

export default Dashboard
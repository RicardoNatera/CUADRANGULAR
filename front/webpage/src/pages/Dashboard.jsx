import { useState, useEffect } from "react"
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import Grupos from "./Grupos"
import Usuarios from "./Usuarios"
import Maestros from "./Maestros"
import Tarjetas from "./Tarjetas"

import NavbarDashboard from "../components/NavbarDashboard"

function Dashboard() {
  const navigate = useNavigate()

  const { user } = useSelector((state) => state.auth)
  const [selected,setSelected] = useState(0)

  const dashboardComponents=[<Grupos/>,<Usuarios/>,<Maestros/>,<Tarjetas/>]

  useEffect(()=>{
    
    if(!user){
      navigate('/login')
    }

  },[user,navigate])

    return (
      <>
        <section className="heading">
          <h1>Bienvenido {user && user.id}</h1>
          <p>Grupos Dashboard</p>
        </section>

        <NavbarDashboard selected={selected} setSelected={setSelected}/>
        
        {dashboardComponents[selected]}
        
      </>
    )
}

export default Dashboard
import { useEffect } from "react"
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

import GruposForm from "../components/GruposForm"

function Dashboard() {
  const navigate = useNavigate()

  const {user} = useSelector((state) => state.auth)

  useEffect(()=>{
    if(!user)
      navigate('/login')
  },[user,navigate])
  return (
    <>
      <section className="heading">
        <h1>Bienvenido {user && user.id}</h1>
        <p>Grupos Dashboard</p>
      </section>

      <GruposForm/>
    </>
  )
}

export default Dashboard
import Grupos from "./Grupos"
import Usuarios from "./Usuarios"
import Maestros from "./Maestros"
import Tarjetas from "./Tarjetas"
import NavbarDashboard from "../components/NavbarDashboard"
import { useState } from "react"
function Dashboard() {
  const [selected,setSelected] = useState(0)
  const dashboardComponents=[<Grupos/>,<Usuarios/>,<Maestros/>,<Tarjetas/>]
    return (
      <>
        <NavbarDashboard selected={selected} setSelected={setSelected}/>
        {dashboardComponents[selected]}
        
      </>
    )
}

export default Dashboard
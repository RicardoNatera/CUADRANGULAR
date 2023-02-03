import { useEffect } from "react"
import { useSelector, useDispatch } from 'react-redux'
import Spinner from '../components/Spinner'

import { getTeachers, reset } from "../features/maestros/maestrosSlice"
import TeacherItem from "../components/TeacherItem"

function Maestros() {
  const dispatch = useDispatch()
  
  const { maestros, isLoading, isError, message } = useSelector((state) => state.maestros)

  useEffect(()=>{
    
    if(isError){
      console.log(message)
    }
    dispatch(getTeachers())
  
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
          {maestros.length > 0 ? (
          <div>
            <div className="grupos">
              {maestros.slice().sort((a,b)=> a.nombre.toUpperCase()>b.nombre.toUpperCase() ? 1:a.nombre.toUpperCase()<b.nombre.toUpperCase() ? -1:0)
.map((maestro)=>(
                <TeacherItem key={maestro.id} maestro={maestro}/>
              ))}
            </div>
          </div>):(<h3>No hay ningun maestro</h3>)}
        </section>
    </>
  )
}

export default Maestros
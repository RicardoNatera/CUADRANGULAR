import { useState } from "react"
import { useDispatch } from "react-redux"
import { createGroup } from "../features/grupos/gruposSlice"
import {toast} from 'react-toastify'
import messages from '../messages/messages.json'

function GruposForm() {
  const defaultColor = "#0000ff"
  const [formData,setFormData] = useState({
    nombre: '',
    edadInicial: '0',
    edadFinal: 0,
    color:defaultColor
  })
  const {nombre,edadInicial,edadFinal,color} = formData;

  const dispatch = useDispatch()

  const onChange = (e)=>{
    setFormData((prevState)=>({
        ...prevState,
        [e.target.name]: e.target.value
    }))
  }

  const onSubmit =(e)=>{
    e.preventDefault()

    if(edadInicial === 0){
      edadInicial='0'
    }
    if(!nombre){
      toast.error(messages.error.camposIncompletos)
    }else if(edadFinal <= edadInicial){
      toast.error(messages.error.edadesInvalidas)
    }else{
      const groupData = {
          nombre,
          edadInicial,
          edadFinal,
          color
      }

    dispatch(createGroup(groupData))
    setFormData({
      nombre: '',
      edadInicial: '0',
      edadFinal: 0,
      color: defaultColor
    })
  }

  }

  return (
    <section className="form">
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label htmlFor="text">Grupo</label>
          <input type="text" name="nombre" id="nombre" value={nombre}
          onChange={onChange}/>
        </div>
        <div className="form-number">
          <label htmlFor="text">Edad de Inicio</label>
          <input type="number" name="edadInicial" id="edadInicial" value={edadInicial}
          onChange={onChange}/>
        
          <label htmlFor="text">Edad Final</label>
          <input type="number" name="edadFinal" id="edadFinal" value={edadFinal}
          onChange={onChange}/>
        </div>
        <div className="form-group">
          <label htmlFor="text">Color</label>
          <input type="color" name="color" id="color" value={color}
          onChange={onChange}/>
        </div>
        <div className="form-group">
          <button className="btn btn-block" type="submit">
            Anadir Grupo
          </button>
        </div>
      </form>
    </section>
  )
}

export default GruposForm
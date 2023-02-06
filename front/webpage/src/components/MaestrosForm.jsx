import { useState } from "react"
import { useDispatch } from "react-redux"
import { createTeacher } from "../features/maestros/maestrosSlice"
import {toast} from 'react-toastify'
import messages from '../messages/messages.json'


function MaestrosForm() {
    const [formData,setFormData] = useState({
        nombre: '',
        apellido: '',
        telefono: '',
        cedula:''
      })
    const {nombre,apellido,telefono,cedula} = formData;
    
    const dispatch = useDispatch()

    const onChange = (e)=>{
        setFormData((prevState)=>({
            ...prevState,
            [e.target.name]: e.target.value
        }))
    }

    const onSubmit =(e)=>{
        e.preventDefault()
        
        if(!nombre || !cedula){
          toast.error(messages.error.camposIncompletos)
        }else{
          const teacherData = {
              nombre,
              apellido,
              telefono,
              cedula
          }
    
        dispatch(createTeacher(teacherData))
        setFormData({
            nombre: '',
            apellido: '',
            telefono: '',
            cedula:''
        })
      }
    }

    return (
        <section className="form">
            <form onSubmit={onSubmit}>
                <div className="form-group">
                    <label htmlFor="text">Nombre</label>
                    <input type="text" name="nombre" id="nombre" value={nombre}
                onChange={onChange}/>
                </div>
                <div className="form-group">
                    <label htmlFor="text">Apellido</label>
                    <input type="text" name="apellido" id="apellido" value={apellido}
                onChange={onChange}/>
                </div>
                <div className="form-group">
                    <label htmlFor="text">Cedula</label>
                    <input type="text" name="cedula" id="cedula" value={cedula}
                onChange={onChange}/>
                </div>
                <div className="form-group">
                    <label htmlFor="text">Telefono</label>
                    <input type="text" name="telefono" id="telefono" value={telefono}
                onChange={onChange}/>
                </div>
                <div className="form-group">
                <button className="btn btn-block" type="submit">
                    Anadir Maestro
                </button>
                </div>
            </form>
        </section>
    )
}

export default MaestrosForm
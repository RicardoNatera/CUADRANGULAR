import { useState } from "react"
import { useDispatch } from "react-redux"
import { createTeacher } from "../features/maestros/maestrosSlice"
import { toast } from 'react-toastify'
import messages from '../messages/messages.json'
import {
    MDBInput,
    MDBBtn
} from 'mdb-react-ui-kit';


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

                <MDBInput size='lg' className='mb-3' type='text' name="nombre" id="nombre" value={nombre} label='Nombre' onChange={onChange}/>
                <MDBInput size='lg' className='mb-3' type='text' name="apellido" id="apellido" value={apellido} label='Apellido' onChange={onChange}/>
                <MDBInput size='lg' className='mb-3' type='text' name="cedula" id="cedula" value={cedula} label='Cédula' onChange={onChange}/>
                <MDBInput size='lg' className='mb-3' type='tel' name="telefono" id="telefono" value={telefono} label='Teléfono' onChange={onChange}/>

                <div className="d-grid gap-1 d-md-flex justify-content-md-end">
                    <MDBBtn type='submit' className='mb-3' rounded >
                        Añadir Maestro
                    </MDBBtn>
                </div>

            </form>
        </section>
    )
}

export default MaestrosForm
import { useState } from "react"
import { useDispatch } from "react-redux"
import { createCard } from "../features/tarjetas/tarjetasSlice"
import { toast } from 'react-toastify'
import messages from '../messages/messages.json'
import {
    MDBBtn
} from 'mdb-react-ui-kit';

function TarjetasForm({Grupos,Maestros}) {
    const [formData,setFormData] = useState({
        id_grupo: '',
        id_maestro: '',
        codigo: ''
      })
    const {id_grupo,id_maestro} = formData;
    
    const dispatch = useDispatch()

    const onChange = (e)=>{
        setFormData((prevState)=>({
            ...prevState,
            [e.target.name]: e.target.value
        }))
    }

    const onSubmit =(e)=>{
        e.preventDefault()
        
        if(!id_grupo || !id_maestro){
            console.log(id_grupo,id_maestro)
          toast.error(messages.error.camposIncompletos)
        }else{
            const longitud = 10000
            const numeroAleatorio = Math.random() * longitud
            const numero = Math.floor(numeroAleatorio)

            let maestro = (Maestros.find(maestro => maestro.id_maestro == id_maestro)).nombre.substring(0,2).toLowerCase()
            let grupo = (Grupos.find(grupo => grupo.id_grupo == id_grupo)).nombre.substring(0,2).toLowerCase()

            const codigo = grupo + '-' + numero + '-' + maestro

            const cardData = {
                id_grupo,
                id_maestro,
                codigo
            }

            
            
            dispatch(createCard(cardData))

            setFormData({
                id_grupo: '',
                id_maestro: '',
                codigo: '',
            })
      }
    }

    return (
        <section className="form">
            <form onSubmit={onSubmit}>
                <div className="form-group">
                    <label htmlFor="text">Grupo</label>
                    <select name="id_grupo" id="id_grupo" onChange={onChange} value={id_grupo}>
                        <option value={null}>Seleccione un Grupo</option>
                        {Grupos.map((grupo)=><option key={grupo.id_grupo} value={grupo.id_grupo}>{grupo.nombre} ({grupo.edadInicio} a {grupo.edadFinal} años)</option>)}
                    </select>
                </div>
                <div className="form-group">
                    <label htmlFor="text">Maestro</label>
                    <select name="id_maestro" id="id_maestro" onChange={onChange} value={id_maestro}>
                        <option value={null}>Seleccione un Maestro</option>
                        {Maestros.map((maestro)=><option key={maestro.id_maestro} value={maestro.id_maestro}>{maestro.nombre} {maestro.apellido} V-{maestro.cedula}</option>)}
                    </select>
                </div>
                <div className="d-grid gap-1 d-md-flex justify-content-md-end">
                    <MDBBtn type='submit' className='mb-3' rounded >
                        Añadir Tarjeta
                    </MDBBtn>
                </div>
            </form>
        </section>
    )
}

export default TarjetasForm
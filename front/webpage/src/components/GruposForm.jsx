import { useState } from "react"
import { useDispatch } from "react-redux"
import { createGroup } from "../features/grupos/gruposSlice"
import { toast } from 'react-toastify'
import messages from '../messages/messages.json'
import {
  MDBInput,
  MDBCol,
  MDBRow,
  MDBBtn
} from 'mdb-react-ui-kit';

function GruposForm() {
  const defaultColor = "#1DF519"
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

        <MDBInput size='lg' className='mb-3' type='text' name="nombre" id="nombre" value={nombre} label='Nombre del grupo' onChange={onChange}/>

        <MDBRow >
          <MDBCol>
            <MDBInput size='lg' className='mb-3' type='number' name="edadInicial" id="edadInicial" value={edadInicial} label='Edad de inicio' min="0"
            onChange={onChange}/>
          </MDBCol>
          <MDBCol>
            <MDBInput size='lg' className='mb-3' type='number' name="edadFinal" id="edadFinal" value={edadFinal} label='Edad final' min={edadInicial}
            onChange={onChange}/>
          </MDBCol>
        </MDBRow>

        <MDBInput size='lg' className='mb-3' type='color' name="color" id="color" value={color} label='Color' onChange={onChange}/>

        <div className="d-grid gap-1 d-md-flex justify-content-md-end">
          <MDBBtn type='submit' className='mb-3' rounded >
            Añadir Grupo
          </MDBBtn>
        </div>
            
      </form>
    </section>
  )
}

export default GruposForm
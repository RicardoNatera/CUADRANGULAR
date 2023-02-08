import { useState } from "react"
import { useDispatch } from "react-redux"
import { createCard } from "../features/tarjetas/tarjetasSlice"
import {toast} from 'react-toastify'
import messages from '../messages/messages.json'


function TarjetasForm() {
    const [formData,setFormData] = useState({
        id_grupo: '',
        id_maestro: '',
        codigo: ''
      })
    const {id_grupo,id_maestro,codigo} = formData;
    
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
          toast.error(messages.error.camposIncompletos)
        }else{
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
                    <label htmlFor="text">id_grupo</label>
                    <input type="text" name="id_grupo" id="id_grupo" value={id_grupo}
                onChange={onChange}/>
                </div>
                <div className="form-group">
                    <label htmlFor="text">id_maestro</label>
                    <input type="text" name="id_maestro" id="id_maestro" value={id_maestro}
                onChange={onChange}/>
                </div>
                <div className="form-group">
                    <label htmlFor="text">codigo</label>
                    <input type="text" name="codigo" id="codigo" value={codigo}
                onChange={onChange}/>
                </div>
                <div className="form-group">
                <button className="btn btn-block" type="submit">
                    Anadir Tarjeta
                </button>
                </div>
            </form>
        </section>
    )
}

export default TarjetasForm
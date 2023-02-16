import { useRef } from 'react';
import { useDispatch } from "react-redux"
import { deleteCard } from '../features/tarjetas/tarjetasSlice'
import { FaTrashAlt, FaDownload } from 'react-icons/fa'
import * as htmlToImage from 'html-to-image';
import Card from './Card'


function CardItem({ card, grupo, maestro }) {
  const dispatch = useDispatch()
  const domEl = useRef(null)

  const downloadCard=async () =>{
    domEl.current.className="tarjeta visible" //Elemento se vuelve visible
    const dataUrl = await htmlToImage.toPng(domEl.current);

    const link = document.createElement('a');
    link.download = 'Tarjeta.png';
    link.href = dataUrl;
    link.click();  
    domEl.current.className="tarjeta hidden" //Elemento se esconde
  }
  return (
    <div className="grupo">
      <Card codigo={card.codigo} grupo={grupo ? grupo.nombre:""} maestro={maestro ? maestro.nombre+' '+maestro.apellido:""} color={grupo ? grupo.color:""} domEl={domEl}/>
        <h3>{card.codigo}</h3>
        {grupo ? <h4>Grupo: {grupo.nombre}</h4>:<></>}
        {maestro ? <h4>Maestro: {maestro.nombre} {maestro.apellido}</h4>:<></>}
        <button onClick={()=>dispatch(deleteCard(card.codigo))} className="close">
            <FaTrashAlt color="red"/>
        </button>
        <button onClick={()=>downloadCard()} className="download">
            <FaDownload color="green"/>
        </button>
    </div>
  )
}

export default CardItem
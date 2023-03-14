import { useRef } from 'react';
import { useDispatch } from "react-redux"
import { deleteCard } from '../features/tarjetas/tarjetasSlice'
import { FaTrashAlt, FaDownload } from 'react-icons/fa'
import { MDBBtn } from 'mdb-react-ui-kit';
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
        <tr>
          <td>
            <p className='fw-bold mb-1'>{card.codigo}</p>            
          </td>
          <td>
            {grupo ? <p className='fw-normal mb-1'>{grupo.nombre}</p>:<p></p>}
          </td>
          <td>
            {maestro ? <p className='fw-normal mb-1'>{maestro.nombre} {maestro.apellido}</p>:<p></p>}
          </td>
          <td>
            <div className='d-flex align-items-center gap-2 justify-content-center'>
              <MDBBtn onClick={()=>dispatch(deleteCard(card.codigo))} rounded size='sm' color='danger'>
                <FaTrashAlt/>
              </MDBBtn>
              <MDBBtn onClick={()=>downloadCard()} rounded size='sm' color='success'>
                {grupo && maestro ? <FaDownload/>:(<span>Cargando</span>)}
            </MDBBtn>
            </div>
          </td>
          {!grupo || !maestro ? (<></>):<Card codigo={card.codigo} grupo={grupo ? grupo.nombre:""} maestro={maestro ? `${maestro.nombre} ${maestro.apellido}`:""} color={grupo ? grupo.color:""} domEl={domEl}/>}
          
        </tr>
  )
}

export default CardItem
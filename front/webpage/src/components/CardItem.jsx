import { useDispatch } from "react-redux"
import { deleteCard } from '../features/tarjetas/tarjetasSlice'
import { FaTrashAlt } from 'react-icons/fa'

function CardItem({ card, grupo, maestro }) {
  const dispatch = useDispatch()
  return (
    <div className="grupo">
        <div>
            {
            // new Date(grupo.createdAt).toLocalString('en-US')
            }
        </div>
        <h3>{card.codigo}</h3>
        {grupo ? <h4>Grupo: {grupo.nombre}</h4>:<></>}
        {maestro ? <h4>Maestro: {maestro.nombre} {maestro.apellido}</h4>:<></>}
        <button onClick={()=>dispatch(deleteCard(card.codigo))} className="close">
            <FaTrashAlt color="red"/>
        </button>
    </div>
  )
}

export default CardItem
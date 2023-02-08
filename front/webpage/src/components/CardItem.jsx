import { useDispatch } from "react-redux"
import { deleteCard } from '../features/tarjetas/tarjetasSlice'
import { FaTrashAlt } from 'react-icons/fa'

function CardItem({card}) {
  const dispatch = useDispatch()
  return (
    <div className="grupo">
        <div>
            {
            // new Date(grupo.createdAt).toLocalString('en-US')
            }
        </div>
        
        <h3>De {card.id_grupo} y {card.id_maestro}</h3>
        <button onClick={()=>dispatch(deleteCard(card.codigo))} className="close">
            <FaTrashAlt color="red"/>
        </button>
    </div>
  )
}

export default CardItem
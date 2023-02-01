import { useDispatch } from "react-redux"
import { deleteGroup } from '../features/grupos/gruposSlice'
import { FaTrashAlt } from 'react-icons/fa'

function GroupItem({grupo}) {
    const dispatch = useDispatch()
  return (
    <div className="grupo" style={{color:grupo.color}}>
        <div>
            {
            // new Date(grupo.createdAt).toLocalString('en-US')
            }
        </div>
        <h2>{grupo.nombre}</h2>
        <h3>De {grupo.edadInicio} a {grupo.edadFinal} años</h3>
        <button onClick={()=>dispatch(deleteGroup(grupo.id_grupo))} className="close">
            <FaTrashAlt color="red"/>
        </button>
    </div>
  )
}

export default GroupItem
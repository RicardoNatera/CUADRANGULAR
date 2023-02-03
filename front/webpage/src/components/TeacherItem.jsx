import { useDispatch } from "react-redux"
import { deleteTeacher } from '../features/maestros/maestrosSlice'
import { FaTrashAlt } from 'react-icons/fa'

function TeacherItem({maestro}) {
    const dispatch = useDispatch()
    return (
      <div className="grupo">
          <div>
              {
              // new Date(grupo.createdAt).toLocalString('en-US')
              }
          </div>
          <h2>{maestro.nombre} {maestro.apellido}</h2>
          <h3>C.I: {maestro.cedula}. Tlfno:{maestro.telefono}</h3>
          <button onClick={()=>dispatch(deleteTeacher(maestro.id_maestro))} className="close">
              <FaTrashAlt color="red"/>
          </button>
      </div>
    )
}

export default TeacherItem
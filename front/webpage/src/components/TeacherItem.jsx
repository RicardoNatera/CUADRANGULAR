import { useDispatch } from "react-redux"
import { deleteTeacher } from '../features/maestros/maestrosSlice'
import { FaTrashAlt } from 'react-icons/fa'
import { MDBBtn } from 'mdb-react-ui-kit';

function TeacherItem({maestro}) {
    const dispatch = useDispatch()
    return (
        <tr>
          <td>
            <p className='fw-bold mb-1'>{maestro.nombre} {maestro.apellido}</p>
          </td>
          <td>
            <p className='fw-normal mb-1'>V-{maestro.cedula}</p>
          </td>
          <td>
            <p className='fw-normal mb-1'>{maestro.telefono}</p>
          </td>
          <td>
            <MDBBtn onClick={()=>dispatch(deleteTeacher(maestro.id_maestro))} rounded size='sm' color='danger'>
              <FaTrashAlt/>
            </MDBBtn>
          </td>
        </tr>
    )
}

export default TeacherItem
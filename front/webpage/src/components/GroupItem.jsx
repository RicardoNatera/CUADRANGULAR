import { useDispatch } from "react-redux"
import { deleteGroup } from '../features/grupos/gruposSlice'
import { FaTrashAlt } from 'react-icons/fa'
import { MDBBtn } from 'mdb-react-ui-kit';

function GroupItem({grupo}) {
  const dispatch = useDispatch()
  return (
      <tr>
          <td>
            <p className='fw-bold mb-1' style={{color:grupo.color}}>{grupo.nombre}</p>
          </td>
          <td>
            <p className='fw-normal mb-1'>{grupo.edadInicio}</p>
          </td>
          <td>
            <p className='fw-normal mb-1'>{grupo.edadFinal}</p>
          </td>
          <td>
            <MDBBtn onClick={()=>dispatch(deleteGroup(grupo.id_grupo))} rounded size='sm' color='danger'>
              <FaTrashAlt/>
            </MDBBtn>
          </td>
        </tr>
  )
}

export default GroupItem
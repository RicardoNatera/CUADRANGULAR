import { useDispatch, useSelector } from "react-redux"
import { deleteUser } from '../features/auth/authSlice'
import { FaTrashAlt, FaUserCircle } from 'react-icons/fa'
import { MDBBtn } from 'mdb-react-ui-kit';

function UserItem({usuario}) {
    const dispatch = useDispatch()
    const { user } = useSelector((state) => state.auth)
  return (
        <tr>
          <td>
            <p className='fw-bold mb-1'>{usuario.usuario}</p>
          </td>
          <td>
            <p className='fw-normal mb-1'>{usuario.email}</p>
          </td>
          <td>
          {user && user.id==usuario.id ? (<>
          <MDBBtn color='info' rounded size='sm' style={{cursor:"auto"}}>
            <FaUserCircle color="blue"/>
        </MDBBtn></>):(<MDBBtn  color='danger' rounded size='sm' onClick={()=>dispatch(deleteUser(usuario.id))}>
            <FaTrashAlt/>
        </MDBBtn>)}
            
          </td>
        </tr>
    
  )
}

export default UserItem
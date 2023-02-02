import { useDispatch, useSelector } from "react-redux"
import { deleteUser } from '../features/auth/authSlice'
import { FaTrashAlt, FaUserCircle } from 'react-icons/fa'

function UserItem({usuario}) {
    const dispatch = useDispatch()
    const { user } = useSelector((state) => state.auth)
  return (
    <div className="grupo">
        <div>
            {
            // new Date(grupo.createdAt).toLocalString('en-US')
            }
        </div>
        <h3>{usuario.usuario}</h3>
        <p>{usuario.email}</p>
        {user && user.id==usuario.id ? (<><div style={{cursor:"auto"}} className="close">
            <FaUserCircle color="blue"/>
        </div></>):(<button onClick={()=>dispatch(deleteUser(usuario.id))} className="close">
            <FaTrashAlt color="red"/>
        </button>)}
    </div>
  )
}

export default UserItem
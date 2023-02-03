import { FaSignInAlt, FaSignOutAlt, FaUser, FaSchool } from 'react-icons/fa'
import {Link, useNavigate, useLocation  } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { logout, reset } from '../features/auth/authSlice'
import logo  from '../img/logo.png'

function Header() {
    const location = useLocation()
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const {user} = useSelector((state) => state.auth)
    const onLogout = () =>{
        dispatch(logout())
        dispatch(reset())
        navigate('/')
    }
    const onDashboard = () =>{
        navigate('/dashboard')
    }
  return (
    <header className='header'>
        <div className="logo">
            <Link to='/'><img src={logo} alt="logo"/></Link>
        </div>
        <ul>
            {user && location.pathname=="/" ? 
            (
                <>
                    <li>
                        <button className='btn' onClick={onDashboard}>
                            <FaSchool/> Dashboard
                        </button>
                    </li>
                    <li>
                        <button className='btn' onClick={onLogout}>
                            <FaSignOutAlt/> Logout
                        </button>
                    </li>
                </>
            ) : user ? (
                <li>
                    <button className='btn' onClick={onLogout}>
                        <FaSignOutAlt/> Logout
                    </button>
                </li>
            ):
            (
                <> 
                    <li>
                    <Link to='/login'>
                        <FaSignInAlt/> Login
                    </Link>
                    </li>
                    <li>
                        <Link to='/register'>
                            <FaUser/> Register
                        </Link>
                    </li>
                </>
            )}
            
        </ul>
    </header>
  )
}

export default Header
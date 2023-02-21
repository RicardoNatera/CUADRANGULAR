import { useState } from 'react'
import { FaSignInAlt, FaSignOutAlt, FaUser, FaSchool, FaBars } from 'react-icons/fa'
import {Link, useNavigate, useLocation  } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { logout, reset } from '../features/auth/authSlice'
import logo  from '../img/logo.png'

import {
    MDBNavbar,
    MDBContainer,
    MDBNavbarNav,
    MDBNavbarItem,
    MDBNavbarLink,
    MDBNavbarToggler,
    MDBNavbarBrand,
    MDBCollapse,
    MDBBtn
} from 'mdb-react-ui-kit';

function Header() {
    const [showNav, setShowNav] = useState(false);

    const location = useLocation()
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const { user } = useSelector((state) => state.auth)

    const onLogout = () =>{
        dispatch(logout())
        dispatch(reset())
        navigate('/')
    }

    const onDashboard = () =>{
        navigate('/dashboard')
    }

  return (
    <header className='mb-5'>
        <MDBNavbar expand='lg' light bgColor='light'>
        <MDBContainer fluid>
          <MDBNavbarBrand >
                <div className="logo">
                    <Link to='/'><img src={logo} alt="logo"/></Link>
                </div>
            </MDBNavbarBrand>

            <MDBNavbarToggler
            type='button'
            data-target='#navbar'
            aria-controls='navbar'
            aria-expanded='false'
            aria-label='Toggle navigation'
            onClick={() => setShowNav(!showNav)}
          >
            <FaBars/>
          </MDBNavbarToggler>

          <MDBCollapse show={showNav} navbar>
            <MDBNavbarNav right fullWidth={false} className='mb-2 mb-lg-0'>
              
             { user && location.pathname=="/" ? 
            (
                <>
                    <MDBNavbarItem>
                        <MDBBtn size="md" className="mx-1" color='light' rippleColor='dark' onClick={onDashboard}>
                            <FaSchool/> Dashboard
                        </MDBBtn>
                    </MDBNavbarItem>
                    <MDBNavbarItem>
                        <MDBBtn size="md" className="mx-1" color='light' rippleColor='dark' onClick={onLogout}>
                            <FaSignOutAlt/> Logout
                        </MDBBtn>
                    </MDBNavbarItem>
                </>
            ) : user ? (
                <MDBNavbarItem>
                    <MDBBtn size="md" className="mx-1" color='light' rippleColor='dark' onClick={onLogout}>
                        <FaSignOutAlt/> Logout
                    </MDBBtn>
                </MDBNavbarItem>
            ):
            (
                <> 
                    <MDBNavbarItem>
                        <MDBNavbarLink  href='/login'>
                            <FaSignInAlt/> Login
                        </MDBNavbarLink>
                    </MDBNavbarItem>
                    <MDBNavbarItem>
                        <MDBNavbarLink  href='/register'>
                            <FaUser/> Register
                        </MDBNavbarLink>
                    </MDBNavbarItem>
                </>
            )}
              </MDBNavbarNav>
            
          </MDBCollapse>
        </MDBContainer>
      </MDBNavbar>
    </header>
  )
}

export default Header
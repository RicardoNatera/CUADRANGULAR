import { useState, useEffect } from "react";
import { useSelector, useDispatch} from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { login, reset } from "../features/auth/authSlice";
import Spinner from '../components/Spinner'

import logo from "../img/logo.png"

import {
    MDBBtn,
    MDBContainer,
    MDBRow,
    MDBCol,
    MDBInput
} from 'mdb-react-ui-kit';

function Login() {
    const [formData,setFormData] = useState({
        email: '',
        password: '',
    })
    const {email,password} = formData;

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const {user,isLoading,isError,isSuccess,message} = useSelector((state) => state.auth) 

    useEffect(()=>{

        if(isError){
            toast.error(message)
        }

        if(isSuccess || user){
            navigate('/dashboard')
        }

        dispatch(reset())

    },[user, isError, isSuccess, message, navigate, dispatch])

    const onChange = (e)=>{
        setFormData((prevState)=>({
            ...prevState,
            [e.target.name]: e.target.value
        }))
    }

    const onSubmit = (e)=>{
        e.preventDefault()

        const userData = {
            email,
            password
        }
        dispatch(login(userData))
    }

    if(isLoading){
        return(
            <Spinner/>
        )
    }

    return (
        <MDBContainer>
          
            <form onSubmit={onSubmit}>
            <MDBRow className='g-0 justify-content-center'>
              <MDBCol md='6'>
                  <div>
                   
                    <img src={logo} className="img" alt="logo"/>
                    
                    <p className="h3 fw-bold mt-1">
                      Iglesia Cuadrangular.<br />
                      Cagua, Venezuela.<br />
                      Ministerio Infantil.</p>
                  </div>

                  <h5 className="fw-normal my-4 " style={{letterSpacing: '1px'}}>Por favor ingrese su cuenta:</h5>

                  <MDBInput wrapperClass='mb-3' label='Correo' type="email" className="form-control" id='email' name='email' value={email} placeholder="Ingrese su email" onChange={onChange}/>
                  <MDBInput wrapperClass='mb-3' label='Contraseña' type="password" id='password' name='password' value={password} placeholder="Ingrese su contraseña" onChange={onChange}/>

                  <MDBBtn type="submit" size='lg' className="mb-3 px-5" style = {{backgroundColor:"#005BA4"}}>Iniciar Sesión</MDBBtn>
                  <p className="pb-lg-2">No tiene una cuenta? <MDBBtn size="sm" color='link' rippleColor='dark' onClick={(e)=>{navigate('/register')}}>Registrese aqui</MDBBtn></p>
                
              </MDBCol>
            </MDBRow>
            </form>
        </MDBContainer>
    )
}

export default Login
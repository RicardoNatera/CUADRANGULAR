import { useState, useEffect } from "react";
import { useSelector, useDispatch} from 'react-redux'
import { useNavigate } from 'react-router-dom'
import {toast} from 'react-toastify'
import { register, reset } from "../features/auth/authSlice";
import Spinner from '../components/Spinner'
import logo from "../img/logo.png"


import {
    MDBBtn,
    MDBContainer,
    MDBRow,
    MDBCol,
    MDBInput
} from 'mdb-react-ui-kit';

function Register() {
    const [formData,setFormData] = useState({
        usuario: '',
        email: '',
        password: '',
        password2: ''
    })
    const {usuario,email,password,password2} = formData;

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

        if(password !== password2){
            toast.error("Las contrasenas no coinciden")
        }else{
            const userData = {
                usuario,
                email,
                password
            }

            dispatch(register(userData))
        }
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
                            
                            
                        </div>
                        <h5 className="fw-normal mt-4" style={{letterSpacing: '1px'}}>Regístrate</h5>
                        <h5 className="fw-normal mb-4" style={{letterSpacing: '1px'}}>Por favor crea una cuenta</h5>

                            <MDBInput wrapperClass='mb-3' label='Usuario' type="text" className="form-control" id='usuario' name='usuario' value={usuario} placeholder="Ingrese su usuario" onChange={onChange}/>
                            <MDBInput wrapperClass='mb-3' label='Email' type="email" className="form-control" id='email' name='email' value={email} placeholder="Ingrese su email" onChange={onChange}/>
                            <MDBInput wrapperClass='mb-3' label='Contraseña' type="password" className="form-control" id='password' name='password' value={password} placeholder="Ingrese su contraseña" onChange={onChange}/>
                            <MDBInput wrapperClass='mb-3' label='Confirmación' type="password" className="form-control" id='password2' name='password2' value={password2} placeholder="Confirme su contraseña" onChange={onChange}/>
                            <MDBBtn type="submit" size='lg' className="mb-3 px-5" style = {{backgroundColor:"#005BA4"}}>
                                Registrarse
                            </MDBBtn>
                            <p className="pb-lg-2">Ya tiene una cuenta? <MDBBtn size="sm" color='link' rippleColor='dark' onClick={(e)=>{navigate('/login')}}>Ingrese aqui</MDBBtn></p>
                    </MDBCol>
                </MDBRow> 
            </form>
            </MDBContainer>
    )
}

export default Register
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
        <MDBContainer className="my-2 text-center">
            <form onSubmit={onSubmit}>
                <MDBRow className="d-flex justify-content-center">
                    <MDBCol size='6'>
                        <div className="d-flex flex-column">
                            <div className="text-center mb-3">
                                <img src={logo} className="img" alt="logo" />
                            </div>
                            <h4>Regístrate <br />
                            Por favor crea una cuenta</h4>
                            <MDBInput wrapperClass='mb-3' label='Usuario' type="text" className="form-control" id='usuario' name='usuario' value={usuario} placeholder="Ingrese su usuario" onChange={onChange}/>
                            <MDBInput wrapperClass='mb-3' label='Email' type="email" className="form-control" id='email' name='email' value={email} placeholder="Ingrese su email" onChange={onChange}/>
                            <MDBInput wrapperClass='mb-3' label='Contraseña' type="password" className="form-control" id='password' name='password' value={password} placeholder="Ingrese su contraseña" onChange={onChange}/>
                            <MDBInput wrapperClass='mb-3' label='Confirmación' type="password" className="form-control" id='password2' name='password2' value={password2} placeholder="Confirme su contraseña" onChange={onChange}/>
                        </div>
                        <div className="text-center pt-1 mb-3 pb-1">
                            <MDBBtn type="submit" className="mb-1 w-100" style = {{backgroundColor:"#005BA4"}}>
                                Registrarse
                            </MDBBtn>
                        </div>
                    </MDBCol>
                </MDBRow> 
            </form>
            </MDBContainer>
    )
}

export default Register
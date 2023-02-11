import { useState, useEffect } from "react";
import { useSelector, useDispatch} from 'react-redux'
import { useNavigate } from 'react-router-dom'
import {toast} from 'react-toastify'
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
        <MDBContainer className="my-2 text-center">
          <form onSubmit={onSubmit}>

            <MDBRow className="d-flex justify-content-center">
              <MDBCol size='6' className="mb-5">
                <div className="d-flex flex-column">

                  <div className="text-center">
                    <img src={logo} className="img" alt="logo" />
                    <h5 className="mt-1 mb-2 pb-1">
                      Iglesia Cuadrangular.<br />
                      Cagua, Venezuela.<br />
                      Ministerio Infantil.
                    </h5>
                  </div>

                  <p>Por favor ingrese su cuenta:</p>

                  <MDBInput wrapperClass='mb-3' label='Correo' type="email" className="form-control" id='email' name='email' value={email} placeholder="Ingrese su email" onChange={onChange}/>
                  <MDBInput wrapperClass='mb-3' label='Contraseña' type="password" id='password' name='password' value={password} placeholder="Ingrese su contraseña" onChange={onChange}/>

                  <div className="text-center pt-1 mb-3 pb-1">
                    <MDBBtn type="submit" className="mb-1 w-100" style = {{backgroundColor:"#005BA4"}}>Iniciar Sesión</MDBBtn>
                  </div>

                  <div className="d-flex flex-row align-items-center justify-content-center pb-4 mb-4">
                    <p className="mb-0"></p>
                    <MDBBtn  onClick={(e)=>{navigate('/register')}} className='mx-2' style = {{backgroundColor:"#005BA4"}}>
                      Registrarse
                    </MDBBtn>
                  </div>

                </div>

              </MDBCol>
            </MDBRow>
          </form>
        </MDBContainer>
    )
}

export default Login
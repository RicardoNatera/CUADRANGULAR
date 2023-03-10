import axios from 'axios'

const API_PROXY = process.env.BACK_URL || "https://cuadrangularserver-production.up.railway.app"
const API_URL = API_PROXY+'/users/'

//Register user
const register = async (userData) =>{
    const response = await axios.post(API_URL,userData)

    if(response.data){
        localStorage.setItem('user',JSON.stringify(response.data))
    }

    return response.data
}

//Login user
const login = async (userData) =>{
    const response = await axios.post(API_URL + 'login',userData)

    if(response.data){
        localStorage.setItem('user',JSON.stringify(response.data))
    }

    return response.data
}

//Logout user
const logout = async () =>{
   localStorage.removeItem('user')
}

//Get all users
const getAllUsers = async(token) =>{
    const config ={
        headers: {
            Authorization : `Bearer ${token}`
        }   
    }
    
    const response = await axios.get(API_URL+'all', config)
    return response.data.data
 
}

//Delete an user
const deleteUser = async(id,token) =>{
    const config ={
        headers: {
            Authorization : `Bearer ${token}`
        }   
    }

    const response = await axios.delete(API_URL+id, config)
    return response.data
 
}

//Get an user
const getUser = async(id,token) =>{
    const config ={
        headers: {
            Authorization : `Bearer ${token}`
        }   
    }

    const response = await axios.get(API_URL+id, config)
    return response.data
 
}

const authService = {
    register,
    logout,
    login,
    getAllUsers,
    deleteUser,
    getUser
}

export default authService
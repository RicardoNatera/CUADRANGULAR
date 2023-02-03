import axios from "axios"

const API_URL = " /maestros/"

const getAllTeachers = async(token) =>{
    const config ={
        headers:{
            Authorization: `Bearer ${token}`
        }
    }
   
    const response = await axios.get(API_URL, config)
    return response.data.data
 
}

const createTeacher = async(teacherData,token) =>{
    const config ={
        headers:{
            Authorization: `Bearer ${token}`
        }
    }

    const response = await axios.post(API_URL, teacherData,config)
    return response.data
}

const deleteTeacher = async(id,token) =>{
    const config ={
        headers:{
            Authorization: `Bearer ${token}`
        }
    }
   
    const response = await axios.delete(API_URL+id, config)
    return response.data
 
}


const maestrosService = {
    getAllTeachers,
    deleteTeacher,
    createTeacher
}

export default maestrosService
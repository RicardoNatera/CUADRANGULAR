import axios from "axios"

const API_URL = " /grupos/"

const createGroup = async(groupData,token) =>{
    const config ={
        headers:{
            Authorization: `Bearer ${token}`
        }
    }

    const response = await axios.post(API_URL, groupData,config)
    return response.data
}

const getAllGroup = async(token) =>{
    const config ={
        headers:{
            Authorization: `Bearer ${token}`
        }
    }
   
    const response = await axios.get(API_URL, config)
    return response.data.data
 
}

const deleteGroup = async(id,token) =>{
    const config ={
        headers:{
            Authorization: `Bearer ${token}`
        }
    }
   
    const response = await axios.delete(API_URL+id, config)
    return response.data
 
}

const gruposService = {
    createGroup,
    getAllGroup,
    deleteGroup
}

export default gruposService
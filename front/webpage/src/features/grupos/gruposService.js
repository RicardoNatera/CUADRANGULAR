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

const gruposService = {
    createGroup
}

export default gruposService
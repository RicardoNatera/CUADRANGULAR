import axios from "axios"

const API_URL = " /tarjetas/"

const getAllCards = async(token) =>{
    const config ={
        headers:{
            Authorization: `Bearer ${token}`
        }
    }

    
    const response = await axios.get(API_URL, config)
    return response.data.data
 
}

const getAllCardsHome = async() =>{
    
    const response = await axios.get(API_URL+"home")
    return response.data.data
 
}


const createCard = async(cardData,token) =>{
    const config ={
        headers:{
            Authorization: `Bearer ${token}`
        }
    }

    const response = await axios.post(API_URL, cardData,config)
    return response.data
}

const deleteCard = async(code,token) =>{
    const config ={
        headers:{
            Authorization: `Bearer ${token}`
        }
    }
   
    const response = await axios.delete(API_URL+code, config)
    return response.data
 
}


const maestrosService = {
    getAllCards,
    deleteCard,
    createCard,
    getAllCardsHome
}

export default maestrosService
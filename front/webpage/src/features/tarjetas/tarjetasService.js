import axios from "axios"

const API_PROXY = process.env.BACK_URL || "https://cuadrangularserver-production.up.railway.app"
const API_URL = API_PROXY+"/tarjetas/"
const configCors = {
    headers: {
        'Access-Control-Allow-Origin': '*',
        'origin':'x-requested-with',
        'Access-Control-Allow-Headers': 'POST, GET, PUT, DELETE, OPTIONS, HEAD, Authorization, Origin, Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers, Access-Control-Allow-Origin',
        'Content-Type': 'application/json',
    },
};

const getAllCards = async(token) =>{
    const config ={
        headers: configCors.headers   
    }
    config.headers.Authorization= `Bearer ${token}`
    
    const response = await axios.get(API_URL, config)
    return response.data.data
 
}

const getAllCardsHome = async() =>{
    
    const response = await axios.get(API_URL+"home",configCors)
    return response.data.data
 
}


const createCard = async(cardData,token) =>{
    const config ={
        headers: configCors.headers   
    }
    config.headers.Authorization= `Bearer ${token}`

    const response = await axios.post(API_URL, cardData,config)
    return response.data
}

const deleteCard = async(code,token) =>{
    const config ={
        headers: configCors.headers   
    }
    config.headers.Authorization= `Bearer ${token}`
   
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
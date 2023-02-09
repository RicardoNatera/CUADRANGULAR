import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import tarjetasService from './tarjetasService'
import { toast } from 'react-toastify'
import messages from '../../messages/messages.json'

const initialState = {
    tarjetas: [],
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: ''
}

//Get all Cards
export const getCards = createAsyncThunk('tarjetas/getAllCards',async(args,thunkAPI)=>{
    try {
        
        const token = thunkAPI.getState().auth.user.token
        return await tarjetasService.getAllCards(token)
        
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

//Create new Card
export const createCard = createAsyncThunk('tarjetas/create',async(cardData,thunkAPI)=>{
    try {
        const token = thunkAPI.getState().auth.user.token
        return await tarjetasService.createCard(cardData,token)
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})
    
//Delete a Card
export const deleteCard = createAsyncThunk('tarjetas/delete',async(cardCode,thunkAPI)=>{
    try {
        const token = thunkAPI.getState().auth.user.token
        return await tarjetasService.deleteCard(cardCode,token)
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})


export const tarjetasSlice = createSlice({
    name:'tarjetas',
    initialState,
    reducers: {
        reset: (state) => initialState
    },
    extraReducers : (builder)=>{
        builder
        .addCase(createCard.pending, (state)=>{
            state.isLoading=true
        })
        .addCase(createCard.fulfilled, (state,action)=>{
            state.isLoading=false
            state.isSuccess=true
            state.tarjetas.push(action.payload[0])
            toast.success(messages.fulfilled.createCard)            
        })
        .addCase(createCard.rejected, (state, action)=>{
            state.isLoading=false
            state.isError=true
            state.message=action.payload
            if(state.message==="Card already exists") toast.error(messages.error.TarjetaExistente)
            
        })
        .addCase(getCards.pending, (state)=>{
            state.isLoading=true
        })
        .addCase(getCards.fulfilled, (state,action)=>{
            state.isLoading=false
            state.isSuccess=true
            state.tarjetas = action.payload
        })
        .addCase(getCards.rejected, (state, action)=>{
            state.isLoading=false
            state.isError=true
            state.message=action.payload
        })
        .addCase(deleteCard.pending, (state)=>{
            state.isLoading=true
        })
        .addCase(deleteCard.fulfilled, (state, action)=>{
            state.isLoading=false
            state.isSuccess=true

            if(action.payload.id==-1){
                toast.error(messages.error.CardExistsInCard)
            }else{
                state.tarjetas = state.tarjetas.filter((tarjeta)=> tarjeta.codigo !== action.payload.id)
                toast.success(messages.fulfilled.deleteCard)
            }
        })
        .addCase(deleteCard.rejected, (state, action)=>{
            state.isLoading=false
            state.isError=true
            state.message=action.payload
        })
    }
})

export const { reset } = tarjetasSlice.actions

export default tarjetasSlice.reducer
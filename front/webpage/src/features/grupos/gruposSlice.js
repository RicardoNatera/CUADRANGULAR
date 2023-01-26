import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import gruposService from './gruposService'
const initialState = {
    grupos: [],
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: ''
}

//Createe new group
export const createGroup = createAsyncThunk('grupos/create',async(groupData,thunkAPI)=>{
try {
    const token = thunkAPI.getState().auth.user.token
    return await gruposService.createGroup(groupData,token)
} catch (error) {
    const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
    return thunkAPI.rejectWithValue(message)
}
})

export const gruposSlice = createSlice({
    name:'grupos',
    initialState,
    reducers: {
        reset: (state) => initialState
    },
    extraReducers : (builder)=>{
        builder
        .addCase(createGroup.pending, (state)=>{
            state.isLoading=true
        })
        .addCase(createGroup.fulfilled, (state,action)=>{
            state.isLoading=false
            state.isSuccess=true
            state.grupos.push(action.payload)
        })
        .addCase(createGroup.rejected, (state, action)=>{
            state.isLoading=false
            state.isError=true
            state.message=action.payload
        })
    }
})

export const { reset } = gruposSlice.actions

export default gruposSlice.reducer
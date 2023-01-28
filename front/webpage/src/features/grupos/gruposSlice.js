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

//Get all groups
export const getGroups = createAsyncThunk('grupos/getAllGroups',async(args,thunkAPI)=>{
    try {
        
        const token = thunkAPI.getState().auth.user.token
        return await gruposService.getAllGroup(token)
        
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
    })

//Delete a group
export const deleteGroup = createAsyncThunk('grupos/delete',async(groupId,thunkAPI)=>{
    try {
        const token = thunkAPI.getState().auth.user.token
        return await gruposService.deleteGroup(groupId,token)
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
        .addCase(getGroups.pending, (state)=>{
            state.isLoading=true
        })
        .addCase(getGroups.fulfilled, (state,action)=>{
            state.isLoading=false
            state.isSuccess=true
            state.grupos = action.payload
        })
        .addCase(getGroups.rejected, (state, action)=>{
            state.isLoading=false
            state.isError=true
            state.message=action.payload
        })
        .addCase(deleteGroup.pending, (state)=>{
            state.isLoading=true
        })
        .addCase(deleteGroup.fulfilled, (state, action)=>{
            state.isLoading=false
            state.isSuccess=true
            state.grupos = state.grupos.filter((grupo)=> grupo.id_grupo !== action.payload.id)
        })
        .addCase(deleteGroup.rejected, (state, action)=>{
            state.isLoading=false
            state.isError=true
            state.message=action.payload
        })
    }
})

export const { reset } = gruposSlice.actions

export default gruposSlice.reducer
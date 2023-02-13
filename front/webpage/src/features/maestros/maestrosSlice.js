import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import maestrosService from './maestrosService'
import { toast } from 'react-toastify'
import messages from '../../messages/messages.json'

const initialState = {
    maestros: [],
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: ''
}

//Get all teachers
export const getTeachers = createAsyncThunk('maestros/getAllTeachers',async(args,thunkAPI)=>{
    try {
        
        const token = thunkAPI.getState().auth.user.token
        return await maestrosService.getAllTeachers(token)
        
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

//Get all teachers
export const getTeachersNoAuth = createAsyncThunk('maestros/getAllTeachersHome',async(args,thunkAPI)=>{
    try {
        
        return await maestrosService.getAllTeachersHome()
        
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

//Create new teacher
export const createTeacher = createAsyncThunk('maestros/create',async(teacherData,thunkAPI)=>{
    try {
        const token = thunkAPI.getState().auth.user.token
        return await maestrosService.createTeacher(teacherData,token)
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})
    
//Delete a teacher
export const deleteTeacher = createAsyncThunk('maestros/delete',async(teacherId,thunkAPI)=>{
    try {
        const token = thunkAPI.getState().auth.user.token
        return await maestrosService.deleteTeacher(teacherId,token)
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})


export const maestrosSlice = createSlice({
    name:'maestros',
    initialState,
    reducers: {
        reset: (state) => initialState
    },
    extraReducers : (builder)=>{
        builder
        .addCase(createTeacher.pending, (state)=>{
            state.isLoading=true
        })
        .addCase(createTeacher.fulfilled, (state,action)=>{
            state.isLoading=false
            state.isSuccess=true
            state.maestros.push(action.payload)
            toast.success(messages.fulfilled.createTeacher)            
        })
        .addCase(createTeacher.rejected, (state, action)=>{
            state.isLoading=false
            state.isError=true
            state.message=action.payload
            if(state.message==="Teacher already exists") toast.error(messages.error.MaestroExistente)
            
        })
        .addCase(getTeachersNoAuth.pending, (state)=>{
            state.isLoading=true
        })
        .addCase(getTeachersNoAuth.fulfilled, (state,action)=>{
            state.isLoading=false
            state.isSuccess=true
            state.maestros = action.payload
        })
        .addCase(getTeachersNoAuth.rejected, (state, action)=>{
            state.isLoading=false
            state.isError=true
            state.message=action.payload
        })
        .addCase(getTeachers.pending, (state)=>{
            state.isLoading=true
        })
        .addCase(getTeachers.fulfilled, (state,action)=>{
            state.isLoading=false
            state.isSuccess=true
            state.maestros = action.payload
        })
        .addCase(getTeachers.rejected, (state, action)=>{
            state.isLoading=false
            state.isError=true
            state.message=action.payload
        })
        .addCase(deleteTeacher.pending, (state)=>{
            state.isLoading=true
        })
        .addCase(deleteTeacher.fulfilled, (state, action)=>{
            state.isLoading=false
            state.isSuccess=true

            if(action.payload.id==-1){
                toast.error(messages.error.teacherExistsInCard)
            }else{
                state.maestros = state.maestros.filter((maestro)=> maestro.id_maestro !== action.payload.id)
                toast.success(messages.fulfilled.deleteTeacher)
            }
        })
        .addCase(deleteTeacher.rejected, (state, action)=>{
            state.isLoading=false
            state.isError=true
            state.message=action.payload
        })
    }
})

export const { reset } = maestrosSlice.actions

export default maestrosSlice.reducer
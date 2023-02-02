import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import authService from './authService'
import {toast} from 'react-toastify'
import messages from '../../messages/messages.json'

//Get user from LocalStorage
const user = JSON.parse(localStorage.getItem('user'))

const initialState = {
    user: user ? user : null,
    users: [],
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: ''
}

// Register user
export const register = createAsyncThunk('auth/register', async (user,thunkAPI) =>{
    try {
        return await authService.register(user)
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

// Login user
export const login = createAsyncThunk('auth/login', async (user,thunkAPI) =>{
    try {
        return await authService.login(user)
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

//Logout user
export const logout = createAsyncThunk('auth/logout', async () =>{
    await authService.logout()
})

//Get all users
export const getAllUsers = createAsyncThunk('auth/getAllUsers', async (args,thunkAPI) =>{
    try {
        const token = thunkAPI.getState().auth.user.token
        return await authService.getAllUsers(token)
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

//Delete an user
export const deleteUser = createAsyncThunk('users/delete',async(userId,thunkAPI)=>{
    try {
        const token = thunkAPI.getState().auth.user.token
        return await authService.deleteUser(userId,token)
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        reset: (state) => {
            state.isLoading = false
            state.isError = false
            state.isSuccess = false
            state.message = '',
            state.users = []
        }
    },
    extraReducers: (builder) => {
        builder
        .addCase(register.pending, (state)=>{
            state.isLoading=true
        })
        .addCase(register.fulfilled, (state, action)=>{
            state.isLoading=false
            state.isSuccess=true
            state.user=action.payload
        })
        .addCase(register.rejected, (state,action)=>{
            state.isLoading=true
            state.isError=true
            state.message=action.payload
            state.user=null
        })
        .addCase(login.pending, (state)=>{
            state.isLoading=true
        })
        .addCase(login.fulfilled, (state, action)=>{
            state.isLoading=false
            state.isSuccess=true
            state.user=action.payload
        })
        .addCase(login.rejected, (state,action)=>{
            state.isLoading=true
            state.isError=true
            state.message=action.payload
            state.user=null
        })
        .addCase(logout.fulfilled, (state)=>{
            state.user=null
        })
        .addCase(getAllUsers.pending, (state)=>{
            state.isLoading=true
        })
        .addCase(getAllUsers.fulfilled, (state,action)=>{
            state.isLoading=false
            state.isSuccess=true
            state.users = action.payload
        })
        .addCase(getAllUsers.rejected, (state, action)=>{
            state.isLoading=false
            state.isError=true
            state.message=action.payload
        })
        .addCase(deleteUser.pending, (state)=>{
            state.isLoading=true
        })
        .addCase(deleteUser.fulfilled, (state, action)=>{
            state.isLoading=false
            state.isSuccess=true
            state.users = state.users.filter((usuario)=> usuario.id !== action.payload.id)
            toast.success(messages.fulfilled.deleteUser)
        })
        .addCase(deleteUser.rejected, (state, action)=>{
            state.isLoading=false
            state.isError=true
            state.message=action.payload
        })
        
    }
})

export const { reset } = authSlice.actions
export default authSlice.reducer
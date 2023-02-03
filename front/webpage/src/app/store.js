import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice'
import gruposReducer from '../features/grupos/gruposSlice'
import maestrosReducer from '../features/maestros/maestrosSlice'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    grupos: gruposReducer,
    maestros: maestrosReducer
  },
});

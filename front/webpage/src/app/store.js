import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice'
import gruposReducer from '../features/grupos/gruposSlice'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    grupos: gruposReducer
  },
});

// src/redux/store.js
import { configureStore } from '@reduxjs/toolkit';
import carReducer from './slices/carSlice';
import cartReducer from './cartSlice';
import authReducer from './slices/authSlice'; 

const store = configureStore({
  reducer: {
    car: carReducer,
    cart: cartReducer,
    auth: authReducer, 
  },
});

export default store;

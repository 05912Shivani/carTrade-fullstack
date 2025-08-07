// src/redux/slices/authSlice.js

import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isAuthenticated: false,
  user: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action) => {
      state.isAuthenticated = true;
      state.user = action.payload;
      localStorage.setItem('userInfo', JSON.stringify(action.payload)); 
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.user = null;
      localStorage.removeItem('userInfo'); 
    },
    setUserFromStorage: (state, action) => {
      // for rehydrating from backend session if needed
      state.isAuthenticated = true;
      state.user = action.payload;
    },
  },
});

export const { login, logout, setUserFromStorage } = authSlice.actions;
export default authSlice.reducer;

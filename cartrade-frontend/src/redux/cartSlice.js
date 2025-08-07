// redux/cartSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

axios.defaults.withCredentials = true; // Ensure session cookies are sent

export const fetchCart = createAsyncThunk('cart/fetchCart', async () => {
  const response = await axios.get('http://localhost:5000/api/cart', {
    withCredentials: true,
  });
  return response.data.cars || [];
});

export const addToCart = createAsyncThunk('cart/addToCart', async (car) => {
  await axios.post('http://localhost:5000/api/cart', { car }, {
  withCredentials: true,
});
  return car;
});

export const removeFromCart = createAsyncThunk('cart/removeFromCart', async (carId) => {
  await axios.delete(`http://localhost:5000/api/cart/${carId}`, {
    withCredentials: true,
  });
  return carId;
});

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [],
  },
  reducers: {
    clearCart: (state) => {
      state.items = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCart.fulfilled, (state, action) => {
        state.items = action.payload;
      })
      .addCase(addToCart.fulfilled, (state, action) => {
        const exists = state.items.find(item => item.id === action.payload.id);
        if (!exists) state.items.push(action.payload);
      })
      .addCase(removeFromCart.fulfilled, (state, action) => {
  state.items = state.items.filter(item => item._id !== action.payload && item.id !== action.payload);
});

  },
});

export const { clearCart } = cartSlice.actions;
export default cartSlice.reducer;

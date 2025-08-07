import { createSlice } from '@reduxjs/toolkit';
import mockCars from '../../data/mockCars';

const carSlice = createSlice({
  name: 'car',
  initialState: {
    cars: mockCars,
    trim: {},
    loading: false,
    error: null,
  },
  reducers: {
    getCars(state) {
      state.cars = mockCars;
    },
    loadTrim(state, action) {
      const { make, model } = action.payload;
      const car = mockCars.find(
        (c) => c.make.toLowerCase() === make.toLowerCase() && c.model.toLowerCase() === model.toLowerCase()
      );
      if (car) {
        state.trim = car;
      } else {
        state.error = 'Car not found';
      }
    },
  },
});

export const { getCars, loadTrim } = carSlice.actions;
export default carSlice.reducer;

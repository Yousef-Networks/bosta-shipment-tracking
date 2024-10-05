// src/redux/trackingSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchShipmentData } from '../services/trackingService';

export const fetchTracking = createAsyncThunk('tracking/fetchTracking', async (trackingNumber) => {
  const data = await fetchShipmentData(trackingNumber);
  return data;
});

const trackingSlice = createSlice({
  name: 'tracking',
  initialState: {
    shipment: null,
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTracking.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchTracking.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.shipment = action.payload;
      })
      .addCase(fetchTracking.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default trackingSlice.reducer;

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import apiService from '../ApiServices/ApiServices';

// Async action to fetch devices
export const fetchDevices = createAsyncThunk('device/fetchDevices', async () => {
  const response = await apiService.get(`/Device/GetDevices`);
  return response.data?.Table || []; 
});

const deviceSlice = createSlice({
  name: 'device',
  initialState: {
    devices: [],
    editDevice: null,
    loading: false,
    error: null,
  },
  reducers: {
    addDevice: (state, action) => {
      state.devices.push(action.payload);
    },
    removeDevice: (state, action) => {
      state.devices = state.devices.filter(device => device.MASTCODE !== action.payload);
    },
    setEditDevice: (state, action) => {
        state.editDevice = action.payload; // Store the device to edit
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchDevices.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchDevices.fulfilled, (state, action) => {
        state.loading = false;
        state.devices = action.payload;
      })
      .addCase(fetchDevices.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { addDevice, removeDevice,setEditDevice } = deviceSlice.actions;
export default deviceSlice.reducer;

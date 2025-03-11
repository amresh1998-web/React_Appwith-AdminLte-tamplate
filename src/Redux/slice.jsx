import { configureStore } from '@reduxjs/toolkit';
import deviceReducer from './DeviceSlice';
import rightReducer from './RightsDistribution';


export const store = configureStore({
  reducer: {
    device: deviceReducer,
    rights:rightReducer,
    
  },
});
export default store;

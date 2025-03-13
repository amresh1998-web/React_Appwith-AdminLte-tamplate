import { configureStore } from '@reduxjs/toolkit';
import deviceReducer from './DeviceSlice';
import rightReducer from './RightsDistribution';
import authoReducer from './Autho';

export const store = configureStore({
  reducer: {
    device: deviceReducer,
    rights:rightReducer,
    auth:authoReducer,
    
  },
});
export default store;

import { configureStore } from "@reduxjs/toolkit";
import rightsReducer from './RightsDistribution';


const store = configureStore({
  reducer: {
    rights: rightsReducer,
  },
});

export default store;

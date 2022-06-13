import { configureStore } from "@reduxjs/toolkit";
import authSliceReducer from "./auth/authSlice";
import candidateSliceReducer from "./candidate/candidateSlice";

export default configureStore({
  reducer: {
    auth: authSliceReducer,
    candidate: candidateSliceReducer,
  },
});

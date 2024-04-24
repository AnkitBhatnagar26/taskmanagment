import { configureStore, combineReducers } from "@reduxjs/toolkit";
import authSliceReducer from "./authSlice";
import { getToken } from "../../utils/common";

const rootReducer = combineReducers({
  auth: authSliceReducer,
});

export const store = configureStore({
  reducer: rootReducer,
  preloadedState: {
    auth: {
      auth_token: getToken(),
      auth_role: "",
    },
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { RootState } from "./store";

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    auth_token: "",
    auth_role: "",
  },
  reducers: {
    changeAuthToken: (draft, action: PayloadAction<{ value: string }>) => {
      const { value } = action.payload;
      draft.auth_token = value;
    },
  },
});

export const { changeAuthToken } = authSlice.actions;
export const selectAuthToken = (state: RootState) => state.auth;

export default authSlice.reducer;

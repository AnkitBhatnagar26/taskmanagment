import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { RootState } from "./store";

interface InitialState {
  auth_token: string | null;
  auth_role: string;
}

const initialState: InitialState = {
  auth_token: "",
  auth_role: "",
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
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

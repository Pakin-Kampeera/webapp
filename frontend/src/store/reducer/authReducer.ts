import { createSlice } from "@reduxjs/toolkit";

export const authReducer = createSlice({
  name: "auth",
  initialState: {
    isLogin: !!localStorage.getItem("token"),
    user: {
      username: null,
    },
  },
  reducers: {
    login(state, action) {
      state.isLogin = true;
      state.user.username = action.payload.username;
    },
    logout(state) {
      localStorage.removeItem("token");
      state.isLogin = false;
    },
  },
});

export const authAction = authReducer.actions;

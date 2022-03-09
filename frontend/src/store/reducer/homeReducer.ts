import { createSlice } from "@reduxjs/toolkit";

export const homeReducer = createSlice({
  name: "home",
  initialState: {
    profile: {
      image: null,
      firstName: null,
      lastName: null,
      username: null,
    },
  },
  reducers: {
    setProfile(state, action) {
      const data = action.payload;
      state.profile.image = data.image;
      state.profile.firstName = data.firstName;
      state.profile.lastName = data.lastName;
      state.profile.username = data.username;
    },
  },
});

export const homeAction = homeReducer.actions;

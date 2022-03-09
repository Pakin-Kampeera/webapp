import { configureStore } from "@reduxjs/toolkit";
import { authReducer } from "./reducer/authReducer";
import { homeReducer } from "./reducer/homeReducer";

export default configureStore({
  reducer: {
    auth: authReducer.reducer,
    home: homeReducer.reducer,
  },
});

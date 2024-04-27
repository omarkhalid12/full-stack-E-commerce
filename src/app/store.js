import { configureStore } from "@reduxjs/toolkit";
import LoginSlice from "./features/loginSlice";
import cartSlice from "./features/cartSlice";
import globalSlice from "./features/globalSlice";

export const store = configureStore({
  reducer: {
    cart: cartSlice,
    login: LoginSlice,
    global: globalSlice
  }
})
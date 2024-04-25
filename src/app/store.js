import { configureStore } from "@reduxjs/toolkit";
import LoginSlice from "./features/loginSlice";
import cartSlice from "./features/cartSlice";

export const store = configureStore({
  reducer: {
    cart: cartSlice,
    login: LoginSlice,
  }
})
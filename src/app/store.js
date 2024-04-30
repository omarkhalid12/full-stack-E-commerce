import { configureStore } from "@reduxjs/toolkit";
import LoginSlice from "./features/loginSlice";
import cartSlice from "./features/cartSlice";
import globalSlice from "./features/globalSlice";
import storage from "redux-persist/lib/storage";
import {persistReducer, persistStore} from "redux-persist";
import { apiSlice } from "./services/apiSlice";

const persistCartConfig = {
  key: "cart",
  storage,
}
const persistedCart = persistReducer(persistCartConfig, cartSlice);

export const store = configureStore({
  reducer: {
    cart: persistedCart,
    login: LoginSlice,
    global: globalSlice,
    [apiSlice.reducerPath]: apiSlice.reducer
  },
  middleware: getDefaultMiddleware => 
  getDefaultMiddleware({
    serializableCheck: false,
  }).concat([apiSlice.middleware])
})

export const persister = persistStore(store)
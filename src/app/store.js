import storage from "redux-persist/lib/storage";
import { configureStore } from "@reduxjs/toolkit";
import {persistReducer, persistStore} from "redux-persist";
import LoginSlice from "./features/loginSlice";
import cartSlice from "./features/cartSlice";
import globalSlice from "./features/globalSlice";
import { productsApiSlice } from "./services/products";

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
    [productsApiSlice.reducerPath]: productsApiSlice.reducer
  },
  middleware: getDefaultMiddleware => 
  getDefaultMiddleware({
    serializableCheck: false,
  }).concat([productsApiSlice.middleware])
})

export const persister = persistStore(store)
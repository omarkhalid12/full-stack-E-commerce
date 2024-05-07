import storage from "redux-persist/lib/storage";
import { configureStore } from "@reduxjs/toolkit";
import {persistReducer, persistStore} from "redux-persist";
import networkSlice from "./features/networkSlice";
import loginSlice from "./features/loginSlice";
import globalSlice from "./features/globalSlice";
import cartSlice from "./features/cartSlice";
import { productsApiSlice } from "./services/products";

const persistCartConfig = {
  key: "cart",
  storage,
}
const persistedCart = persistReducer(persistCartConfig, cartSlice);

export const store = configureStore({
  reducer: {
    network: networkSlice,
    cart: persistedCart,
    login: loginSlice,
    global: globalSlice,
    [productsApiSlice.reducerPath]: productsApiSlice.reducer
  },
  middleware: getDefaultMiddleware => 
  getDefaultMiddleware({
    serializableCheck: false,
  }).concat([productsApiSlice.middleware])
})

export const persister = persistStore(store)
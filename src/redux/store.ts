import { configureStore } from "@reduxjs/toolkit";
import filterSlice from "./filter/slice";
import cartSlice from "./cart/slice";
import pizzas from "./pizza/slice";
import { useDispatch } from "react-redux";

export const store = configureStore({
  reducer: {
    filterSlice,
    cartSlice,
    pizzas,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();

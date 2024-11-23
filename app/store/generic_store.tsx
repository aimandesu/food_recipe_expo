// store.ts
import { configureStore } from "@reduxjs/toolkit";
import {
  countSlice,
  productSlice,
  statusSlice,
} from "../(screens)/generic_test";
// import { productSlice, statusSlice, countSlice } from "./generic_slice";

export const genericStore = configureStore({
  reducer: {
    product: productSlice.reducer,
    status: statusSlice.reducer,
    count: countSlice.reducer,
  },
});

export type RootState = ReturnType<typeof genericStore.getState>;
export type AppDispatch = typeof genericStore.dispatch;

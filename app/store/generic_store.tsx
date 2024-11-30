// store.ts
import { configureStore } from "@reduxjs/toolkit";
import {
  countSlice,
  productSlice,
  recipeDetailsSlice,
  statusSlice,
} from "../utils/provider_wrapper";

// import { productSlice, statusSlice, countSlice } from "./generic_slice";

export const genericStore = configureStore({
  reducer: {
    product: productSlice.reducer,
    status: statusSlice.reducer,
    count: countSlice.reducer,
    recipeDetailsTab: recipeDetailsSlice.reducer,
  },
});

export type GenericRootState = ReturnType<typeof genericStore.getState>;
export type GenericAppDispatch = typeof genericStore.dispatch;

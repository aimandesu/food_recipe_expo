import { configureStore } from "@reduxjs/toolkit";
import { Store } from "redux";
import ThisIsJustaName from "./recipe/RecipeSlice";
// import { productSlice, statusSlice, countSlice } from "./generic_slice";

export const store: Store = configureStore({
  reducer: {
    recipes: ThisIsJustaName,
    // product: productSlice.reducer,
    // status: statusSlice.reducer,
    // count: countSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

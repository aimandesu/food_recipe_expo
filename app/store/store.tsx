import { configureStore } from "@reduxjs/toolkit";
import { Store } from "redux";
import ThisIsJustaName from "./recipe/RecipeSlice";

export const store: Store = configureStore({
  reducer: {
    recipes: ThisIsJustaName,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

import { configureStore } from "@reduxjs/toolkit";
import { Store } from "redux";
import ThisIsJustaName from "./recipe/RecipeSlice";
import SearchMeal from "./recipe/SearchSlice";
import { SearchAPIslice } from "./recipe/meal/MealApiSlice";
// import { productSlice, statusSlice, countSlice } from "./generic_slice";

export const store: Store = configureStore({
  reducer: {
    recipes: ThisIsJustaName,
    searchMeal: SearchMeal,
    [SearchAPIslice.reducerPath]: SearchAPIslice.reducer,
    // product: productSlice.reducer,
    // status: statusSlice.reducer,
    // count: countSlice.reducer,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat(SearchAPIslice.middleware);
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

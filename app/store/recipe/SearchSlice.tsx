import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  Meal,
  MealSchema,
  SearchMeal,
  SearchMealSchema,
} from "../scheme/SearchFoodScheme";
import { SearchAPIslice } from "./meal/MealApiSlice";

export interface MealSearchState {
  data: SearchMeal;
  loading: boolean;
  error: string | null;
  selectedMeal: Meal | null;
}

const initialState: MealSearchState = {
  data: SearchMealSchema.parse({}),
  loading: false,
  error: null,
  selectedMeal: null,
};

const searchSlice = createSlice({
  name: "searchMeal",
  initialState,
  reducers: {
    changeRecipe: (state, action: PayloadAction<string>) => {
      state.selectedMeal =
        state.data.meals?.find((meal) => meal.idMeal == action.payload) || null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(SearchAPIslice.endpoints.getMeals.matchPending, (state) => {
        state.loading = true;
      })
      .addMatcher(
        SearchAPIslice.endpoints.getMeals.matchFulfilled,
        (state, action: PayloadAction<SearchMeal>) => {
          state.loading = false;
          state.data = action.payload;
          state.selectedMeal = action.payload?.meals?.[0] ?? null;
        }
      )
      .addMatcher(
        SearchAPIslice.endpoints.getMeals.matchRejected,
        (state, action) => {
          state.loading = false;
          state.error = action.error.message || "Failed to fetch meals";
        }
      );
  },
});

export default searchSlice.reducer;
export const { changeRecipe } = searchSlice.actions;

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { z } from "zod";
import { FoodRecipe, FoodRecipeSchema } from "../scheme/FoodRecipe";
import { mockData } from "@/app/api/mock_data";

// Define initial state
export interface RecipesState {
  recipes: FoodRecipe[];
  loading: boolean;
  error: string | null;
}

const initialState: RecipesState = {
  recipes: [],
  loading: false,
  error: null,
};

// Step 3: Create Async Thunk for API call
export const fetchRecipes: any = createAsyncThunk(
  "recipes/fetchRecipes",
  async (_, { rejectWithValue }) => {
    try {
      // Validate the API response with Zod
      const parsedData = z.array(FoodRecipeSchema).parse(mockData);
      return parsedData; // If valid, return parsed data
    } catch (error) {
      if (error instanceof z.ZodError) {
        // Zod validation error
        return rejectWithValue(error.errors);
      }
      // Network or other error
      return rejectWithValue("Failed to fetch recipes");
    }
  }
);

// Step 4: Create the slice
const recipesSlice = createSlice({
  name: "recipes",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchRecipes.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchRecipes.fulfilled, (state, action) => {
        state.recipes = action.payload; // Update state with validated data
        state.loading = false;
      })
      .addCase(fetchRecipes.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default recipesSlice.reducer;

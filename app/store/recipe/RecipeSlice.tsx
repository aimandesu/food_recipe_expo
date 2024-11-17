import { PayloadAction, createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { z } from "zod";
import { FoodRecipe, FoodRecipeSchema } from "../scheme/FoodRecipeScheme";
import { mockData } from "@/app/api/mock_data";
import AsyncStorage from "@react-native-async-storage/async-storage";

const STORAGE_KEY = "recipes_data";

export interface RecipesState {
  recipes: FoodRecipe[];
  loading: boolean;
  error: string | null;
  selectedCategory: FoodRecipe | null;
}

const initialState: RecipesState = {
  recipes: [],
  loading: false,
  error: null,
  selectedCategory: null,
};

const recipesSlice = createSlice({
  name: "recipes",
  initialState,
  reducers: {
    findCategory: (state, action: PayloadAction<string>) => {
      const tag = action.payload;
      state.selectedCategory =
        state.recipes.find((category) => category.tag === tag) || null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchRecipes.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchRecipes.fulfilled, (state, action) => {
        state.recipes = action.payload;
        state.loading = false;
      })
      .addCase(fetchRecipes.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
    builder
      .addCase(saveRecipeAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(saveRecipeAsync.fulfilled, (state, action) => {
        state.recipes = [...state.recipes, action.payload];
        state.loading = false;
      })
      .addCase(saveRecipeAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
    builder.addCase(clearAllData.fulfilled, (state, _) => {
      state.recipes = z.array(FoodRecipeSchema).parse(mockData);
      state.loading = false;
    });
  },
});

//normal func that has async
// export const saveRecipeAsync = (recipe: FoodRecipe) => async (dispatch: any) => {
//   try {
//     const jsonValue = JSON.stringify(recipe);
//     await AsyncStorage.setItem(STORAGE_KEY, jsonValue);
//     dispatch(saveRecipe(recipe)); // Dispatch the synchronous action
//   } catch (error) {
//     console.error("Failed to save recipe", error);
//   }
// };

//async function
export const saveRecipeAsync: any = createAsyncThunk(
  "recipes/saveRecipe",
  async (recipe: FoodRecipe, { getState }) => {
    try {
      const state = getState() as { recipes: RecipesState };
      const updatedRecipes = [...state.recipes.recipes, recipe];
      const jsonValue = JSON.stringify(updatedRecipes);
      await AsyncStorage.setItem(STORAGE_KEY, jsonValue);

      return recipe;
    } catch (error) {
      console.error("Failed to save recipe", error);
      throw error;
    }
  }
);

export const clearAllData: any = createAsyncThunk(
  "recipes/clearAll",
  async (_, { rejectWithValue }) => {
    try {
      await AsyncStorage.clear();

      return true;
    } catch (error) {
      return rejectWithValue(`Failed to clear storage: ${error || error}`);
    }
  }
);

//network call example async
export const fetchRecipes: any = createAsyncThunk(
  "recipes/fetchRecipes",
  async (_, { rejectWithValue }) => {
    console.log("it runs");

    try {
      const storedData = await AsyncStorage.getItem(STORAGE_KEY);

      if (storedData) {
        // Parse and validate stored data
        const parsedStoredData = JSON.parse(storedData);
        const validatedStoredData = z
          .array(FoodRecipeSchema)
          .parse(parsedStoredData);
        return validatedStoredData;
      }

      const parsedData = z.array(FoodRecipeSchema).parse(mockData);
      return parsedData;
    } catch (error) {
      console.log(error, "some error");

      if (error instanceof z.ZodError) {
        // Zod validation error
        return rejectWithValue(error.errors);
      }
      // Network or other error
      return rejectWithValue("Failed to fetch recipes");
    }
  }
);

export const { findCategory } = recipesSlice.actions;
export default recipesSlice.reducer;

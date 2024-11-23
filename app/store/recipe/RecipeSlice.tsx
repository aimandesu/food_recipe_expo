import { PayloadAction, createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { z } from "zod";
import {
  FoodRecipe,
  FoodRecipeSchema,
  RecipeDetails,
} from "../scheme/FoodRecipeScheme";
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
        (state.recipes = action.payload), (state.loading = false);
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
  async (recipeDetails: RecipeDetails & { tag: string }, { getState }) => {
    try {
      // Retrieve the current state
      const state = getState() as { recipes: RecipesState };

      // Flatten existing recipes to get a list of all recipes
      const currentRecipes = state.recipes.recipes.flatMap((r) => r.recipes);

      // Find the highest current id and increment it
      const maxId = currentRecipes.reduce(
        (max, r) => (r.id && r.id > max ? r.id : max),
        0
      );

      // Add an id to the new recipe
      const newRecipeWithId = {
        ...recipeDetails,
        id: maxId + 1, // Assign the next available id
      };

      // Check if a FoodRecipe with the same tag already exists
      const existingTagIndex = state.recipes.recipes.findIndex(
        (r) => r.tag === recipeDetails.tag
      );

      let updatedRecipes;
      if (existingTagIndex > -1) {
        // If the tag exists, append the new recipe to the existing recipes
        updatedRecipes = [...state.recipes.recipes];
        updatedRecipes[existingTagIndex] = {
          ...updatedRecipes[existingTagIndex],
          recipes: [
            ...updatedRecipes[existingTagIndex].recipes,
            newRecipeWithId,
          ],
        };
      } else {
        // If the tag does not exist, create a new FoodRecipe entry
        const newFoodRecipe: FoodRecipe = {
          tag: recipeDetails.tag,
          recipes: [newRecipeWithId],
        };
        updatedRecipes = [...state.recipes.recipes, newFoodRecipe];
      }

      // Save the updated state to AsyncStorage
      const jsonValue = JSON.stringify(updatedRecipes);
      await AsyncStorage.setItem(STORAGE_KEY, jsonValue);
      return updatedRecipes;
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

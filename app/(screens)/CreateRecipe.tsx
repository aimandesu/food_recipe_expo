import React from "react";
import { FoodRecipe } from "../store/scheme/FoodRecipe";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store/store";
import {
  RecipesState,
  saveRecipeAsync,
  clearAllData,
} from "../store/recipe/RecipeSlice";
import { Button } from "react-native";

const CreateRecipe = () => {
  const dispatch = useDispatch<AppDispatch>();
  const recipes: RecipesState = useSelector(
    (state: RootState) => state.recipes
  );

  const handleSaveRecipe = async () => {
    const newRecipe: FoodRecipe = {
      tag: "Malay",
      recipes: [
        {
          name: "Spaghetti Bolognese",
          ingredients: ["Pasta", "Tomato Sauce", "Ground Beef"],
          instructions: ["Cook pasta", "Add sauce", "Mix with beef"],
        },
      ],
    };

    try {
      await dispatch(saveRecipeAsync(newRecipe))
        // then((result) => {
        //   dispatch(createRecipe(newRecipe));
        // }).
        .unwrap();
    } catch (error) {
      console.error("Failed to save recipe:", error);
    }
  };

  const handleClearStorage = async () => {
    try {
      await dispatch(clearAllData()).unwrap();
      // Optionally refetch or clear your Redux state here
    } catch (error) {
      console.error("Failed to clear storage:", error);
    }
  };

  return (
    <>
      <Button title="Test add recipe" onPress={() => handleSaveRecipe()} />
      <Button title="Delete all data" onPress={() => handleClearStorage()} />
    </>
  );
};

export default CreateRecipe;

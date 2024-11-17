import React from "react";
import { FoodRecipe } from "../store/scheme/FoodRecipeScheme";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store/store";
import {
  RecipesState,
  saveRecipeAsync,
  clearAllData,
} from "../store/recipe/RecipeSlice";
import { Button } from "react-native";
import { pickAndSaveImage } from "@/hooks/imagePicker";

const CreateRecipe = () => {
  const dispatch = useDispatch<AppDispatch>();
  const recipes: RecipesState = useSelector(
    (state: RootState) => state.recipes
  );

  const handleSaveRecipe = async () => {
    try {
      const imagePath = await pickAndSaveImage();

      if (!imagePath) {
        alert("Failed to pick image");
        return;
      }

      const newRecipe: FoodRecipe = {
        tag: "Malay",
        recipes: [
          {
            image: imagePath,
            name: "Spaghetti Bolognese",
            ingredients: ["Pasta", "Tomato Sauce", "Ground Beef"],
            instructions: ["Cook pasta", "Add sauce", "Mix with beef"],
          },
        ],
      };

      await dispatch(saveRecipeAsync(newRecipe)).unwrap();
    } catch (error) {
      console.error("Failed to save recipe:", error);
    }
  };

  const handleClearStorage = async () => {
    try {
      await dispatch(clearAllData()).unwrap();
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

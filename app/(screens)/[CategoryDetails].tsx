import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchRecipes,
  findCategory,
  RecipesState,
} from "../store/recipe/RecipeSlice";
import { AppDispatch, RootState } from "../store/store";
import { View, Text } from "react-native";
import { useLocalSearchParams } from "expo-router";

const CategoryDetails = () => {
  const dispatch = useDispatch<AppDispatch>();
  const recipes: RecipesState = useSelector(
    (state: RootState) => state.recipes
  );

  const { CategoryDetails } = useLocalSearchParams<{
    CategoryDetails: string;
  }>();

  useEffect(() => {
    if (CategoryDetails) {
      dispatch(findCategory(CategoryDetails));
    }
  }, [CategoryDetails, dispatch]);

  const selectedCategory = recipes.selectedCategory;

  return (
    <View>
      {selectedCategory ? (
        <Text>Recipes in {selectedCategory.tag}</Text>
      ) : (
        <Text>No category found</Text>
      )}
    </View>
  );
};

export default CategoryDetails;

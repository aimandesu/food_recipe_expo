import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchRecipes,
  findCategory,
  RecipesState,
} from "../store/recipe/RecipeSlice";
import { AppDispatch, RootState } from "../store/store";
import { View, Text, FlatList, Image } from "react-native";
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
        <FlatList
          data={selectedCategory.recipes}
          renderItem={({ item, index }) => {
            const imagePath = item.image;

            return (
              <View>
                {typeof imagePath === "string" &&
                (imagePath.startsWith("file://") ||
                  imagePath.startsWith("/")) ? (
                  <Image
                    source={{ uri: imagePath }} // Local file URI
                    style={{ width: 200, height: 200 }}
                  />
                ) : typeof imagePath === "number" ? (
                  <Image
                    source={imagePath} // Static asset
                    style={{ width: 200, height: 200 }}
                  />
                ) : (
                  <Text style={{ color: "red", fontSize: 16 }}>
                    Image not found
                  </Text>
                )}
                <Text
                  style={{
                    color: "red",
                    fontSize: 16,
                    fontWeight: "bold",
                  }}
                >
                  {item.name}
                </Text>
              </View>
            );
          }}
        />
      ) : (
        <Text>No category found</Text>
      )}
    </View>
  );
};

export default CategoryDetails;

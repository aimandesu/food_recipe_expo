import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchRecipes, RecipesState } from "../store/recipe/RecipeSlice";
import { AppDispatch, RootState } from "../store/store";
import { View, Text } from "react-native";

const ZodTest = () => {
  const dispatch = useDispatch<AppDispatch>();
  const recipes: RecipesState = useSelector(
    (state: RootState) => state.recipes
  );

  useEffect(() => {
    dispatch(fetchRecipes()); // Dispatch the async action
  }, [dispatch]);

  if (recipes.loading)
    return (
      <View>
        <Text>Error</Text>
      </View>
    );
  if (recipes.error) return <div>Error: {recipes.error}</div>;

  return (
    <>
      <View>
        {recipes.recipes.map((e, index) => (
          <View key={index}>
            <Text>{e.tag}</Text>
          </View>
        ))}
      </View>
    </>
  );
};

export default ZodTest;

import { router, useLocalSearchParams } from "expo-router";
import { Button, Text, View, Image, Dimensions } from "react-native";

import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  findRecipeDetails,
  RecipesState,
} from "@/app/store/recipe/RecipeSlice";
import { AppDispatch, RootState } from "@/app/store/store";
import ProviderWrapper from "@/app/utils/provider_wrapper";
import {
  GenericAppDispatch,
  GenericRootState,
  genericStore,
} from "@/app/store/generic_store";
import { createGenericSlice } from "@/app/store/generic_slice";
import { RecipeDetailsTab } from "@/app/utils/enum";

const RecipeDetails = () => {
  const dispatch = useDispatch<AppDispatch>();
  const recipes: RecipesState = useSelector(
    (state: RootState) => state.recipes
  );

  const genericDispatch = useDispatch<GenericAppDispatch>();
  const recipeTabsState = useSelector(
    (state: GenericRootState) => state.recipeDetailsTab
  );

  const { tag, id } = useLocalSearchParams<{
    tag: string;
    id: string;
  }>();

  useEffect(() => {
    dispatch(
      findRecipeDetails({
        tag: tag,
        id: parseInt(id),
      })
    );
  }, [dispatch]);

  const imagePath = recipes.selectedRecipe?.image;
  const width = Dimensions.get("window").width;
  const height = Dimensions.get("window").height;

  return (
    <ProviderWrapper stores={[genericStore]}>
      <View style={{ flex: 1, alignItems: "center" }}>
        {recipeTabsState.data}
        {typeof imagePath === "string" &&
        (imagePath.startsWith("file://") || imagePath.startsWith("/")) ? (
          <Image
            source={{ uri: imagePath }}
            style={{
              width: width,
              height: height / 3,
              borderRadius: 12,
            }}
          />
        ) : typeof imagePath === "number" ? (
          <Image
            source={imagePath}
            style={{
              width: width,
              height: height / 3,
              borderRadius: 12,
            }}
          />
        ) : (
          <Text style={{ color: "black", fontSize: 16 }}>Image not found</Text>
        )}
        <Text>{recipes.selectedRecipe?.name}</Text>

        {/* <Button
        title="Go to Recipe Details"
        onPress={() =>
          router.push({
            pathname: "/screens",
            params: { id: 123 },
          })
        }
      /> */}
      </View>
    </ProviderWrapper>
  );
};

export default RecipeDetails;

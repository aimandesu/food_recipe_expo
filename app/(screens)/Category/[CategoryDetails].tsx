import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchRecipes,
  findCategory,
  RecipesState,
} from "../../store/recipe/RecipeSlice";
import { AppDispatch, RootState } from "../../store/store";
import { View, Text, FlatList, Image, Dimensions } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { BtnStyles, shadowStyles } from "../../utils/custom_styles";

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

  const width = Dimensions.get("window").width;
  const height = Dimensions.get("window").height;

  const selectedCategory = recipes.selectedCategory;

  const btn = BtnStyles({
    backgroundColor: "pink",
    height: null,
    width: null,
    // borderRadius: 12,
    // borderWidth: 2,
  });

  return (
    <>
      {selectedCategory ? (
        <FlatList
          data={selectedCategory.recipes}
          renderItem={({ item, index }) => {
            const imagePath = item.image;

            return (
              <View
                style={{
                  padding: 10,
                  display: "flex",
                  flexDirection: "row",
                }}
              >
                {typeof imagePath === "string" &&
                (imagePath.startsWith("file://") ||
                  imagePath.startsWith("/")) ? (
                  <Image
                    source={{ uri: imagePath }}
                    style={{
                      width: width / 2,
                      height: height / 3,
                      borderRadius: 12,
                    }}
                  />
                ) : typeof imagePath === "number" ? (
                  <Image
                    source={imagePath}
                    style={{
                      width: width / 2,
                      height: height / 3,
                      borderRadius: 12,
                    }}
                  />
                ) : (
                  <Text style={{ color: "black", fontSize: 16 }}>
                    Image not found
                  </Text>
                )}
                <View
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    flex: 1,
                    width: width / 2,
                    paddingHorizontal: 10,
                    position: "relative",
                  }}
                >
                  <Text
                    style={{
                      color: "black",
                      fontSize: 30,
                      fontWeight: "bold",
                    }}
                  >
                    {item.name}
                  </Text>

                  <View
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      flexWrap: "wrap",
                    }}
                  >
                    {item.ingredients.map((e) => {
                      return (
                        <Text
                          key={e}
                          style={{
                            borderColor: "pink",
                            borderRadius: 10,
                            borderWidth: 2,
                            color: "black",
                            fontSize: 15,
                            fontWeight: "bold",
                            padding: 3,
                            marginRight: 5,
                            marginBottom: 5,
                          }}
                        >
                          {e}
                        </Text>
                      );
                    })}
                  </View>
                  <View
                    style={[
                      [
                        btn.btnIcon,
                        {
                          // alignSelf: "flex-end",
                          position: "absolute", // Absolute positioning within the parent
                          bottom: 10, // Anchors the container to the bottom
                          right: 10,
                          padding: 5,
                        },
                      ],
                    ]}
                  >
                    <Text>Learn more</Text>
                  </View>
                </View>
              </View>
            );
          }}
        />
      ) : (
        <Text>No category found</Text>
      )}
    </>
  );
};

export default CategoryDetails;

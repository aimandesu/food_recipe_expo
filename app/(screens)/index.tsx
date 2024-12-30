import React, { useEffect, useState } from "react";
import { Asset } from "expo-asset";
import {
  View,
  Text,
  ScrollView,
  FlatList,
  Button,
  Dimensions,
  TouchableOpacity,
  Image,
  Pressable,
} from "react-native";
import { Category } from "../utils/enum";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import SearchingBar from "../components/SearchingBar";
import { BtnStyles, shadowStyles } from "../utils/custom_styles";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store/store";
import { fetchRecipes, RecipesState } from "../store/recipe/RecipeSlice";
import CustomButton from "../components/CustomButton";

const Index = () => {
  const width = Dimensions.get("window").width;
  const height = Dimensions.get("window").height;

  const [searchQuery, setSearchQuery] = useState("");

  const dispatch = useDispatch<AppDispatch>();
  const recipes: RecipesState = useSelector(
    (state: RootState) => state.recipes
  );

  useEffect(() => {
    dispatch(fetchRecipes());
  }, [dispatch]);

  if (recipes.loading)
    return (
      <View>
        <Text>Loading...</Text>
      </View>
    );
  if (recipes.error) return <Text>Error: {recipes.error}</Text>;

  const menuIcon = BtnStyles({
    backgroundColor: "whitesmoke",
  });

  return (
    <View style={{ flex: 1 }}>
      <FlatList
        ListHeaderComponent={
          <View
            style={{
              display: "flex",
              flexDirection: "column",
              padding: 10,
            }}
          >
            <Text>Hola Amigos</Text>
            <Text
              style={{
                fontSize: 30,
              }}
            >
              {"Make your own food, \nstay at home"}
            </Text>
            <SearchingBar
              input={searchQuery}
              onInputChange={(value: string) => {
                setSearchQuery(value);
                // Your search logic here
                console.log("Debounced search:", value);
                //go to another page and use that debounce value
              }}
              onKeyPress={() => router.push(`/Search/${searchQuery}`)}
              debounceDelay={1500}
            />
            <ScrollView
              horizontal={true}
              style={{ flexDirection: "row" }}
              contentContainerStyle={{
                padding: 5,
              }}
            >
              {Object.values(Category).map((e, index) => (
                <View
                  key={index}
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    paddingHorizontal: 5,
                    alignItems: "center",
                  }}
                >
                  <View style={menuIcon.btnIcon}>
                    {(() => {
                      switch (e) {
                        case Category.Popular:
                          return (
                            <Ionicons name="star" size={24} color="gold" />
                          );
                        case Category.Western:
                          return (
                            <Ionicons
                              name="restaurant"
                              size={24}
                              color="blue"
                            />
                          );
                        case Category.Drinks:
                          return (
                            <Ionicons name="wine" size={24} color="purple" />
                          );
                        case Category.Local:
                          return (
                            <Ionicons name="pizza" size={24} color="green" />
                          );
                        case Category.Dessert:
                          return (
                            <Ionicons name="ice-cream" size={24} color="pink" />
                          );
                        default:
                          return (
                            <Ionicons
                              name="help-circle"
                              size={24}
                              color="gray"
                            />
                          );
                      }
                    })()}
                  </View>
                  <Text>{e}</Text>
                </View>
              ))}
            </ScrollView>
            <Pressable
              accessibilityRole="button"
              accessibilityLabel="Go to profile screen"
              accessibilityHint="Navigates to the user profile screen when pressed"
            >
              <CustomButton
                text="go to generic stuff - not working as of now"
                onTap={() => router.push("/(screens)/generic_test_head")}
              />
            </Pressable>
          </View>
        }
        data={recipes.recipes}
        keyExtractor={(item, index) => index.toString()}
        numColumns={2}
        renderItem={({ item, index }) => {
          const imagePath = item.recipes[0]?.image;
          return (
            <TouchableOpacity
              onPress={() =>
                router.push({
                  pathname: "/Category/[CategoryDetails]",
                  params: { CategoryDetails: item.tag },
                })
              }
              style={{
                ...shadowStyles({
                  shadowColor: "#000",
                  shadowOffset: { width: 0, height: 2 },
                  shadowOpacity: 0.2,
                  shadowRadius: 5,
                }),
                flex: 1,
                margin: 5,
                backgroundColor: "whitesmoke",
                alignItems: "center",
                justifyContent: "center",
                height: width / 2 - 20, // Square shape
                borderRadius: 8,
              }}
            >
              {/* Image Component */}
              {typeof imagePath === "string" &&
              (imagePath.startsWith("file://") || imagePath.startsWith("/")) ? (
                <Image
                  source={{ uri: imagePath }}
                  style={{
                    width: width / 2 - 40,
                    height: width / 2 - 40,
                    borderRadius: 8,
                  }}
                  resizeMode="cover"
                />
              ) : typeof imagePath === "number" ? (
                <Image
                  source={imagePath}
                  style={{
                    width: width / 2 - 40,
                    height: width / 2 - 40,
                    borderRadius: 8,
                  }}
                  resizeMode="cover"
                />
              ) : (
                // Placeholder when the imagePath is invalid or undefined
                <Text
                  style={{
                    color: "gray",
                    fontSize: 14,
                  }}
                >
                  No Image Available
                </Text>
              )}

              {/* Text Overlay */}
              <Text
                style={{
                  // color: "red",
                  fontSize: 16,
                  fontWeight: "bold",
                  position: "absolute",
                  bottom: 60,
                  backgroundColor: "rgba(255, 255, 255, 0.7)",
                  paddingHorizontal: 5,
                  borderRadius: 5,
                }}
              >
                {item.tag}
              </Text>
            </TouchableOpacity>
          );
        }}
        contentContainerStyle={{
          padding: 10,
        }}
        nestedScrollEnabled={true}
      />

      <View
        style={[
          menuIcon.btnIcon,
          {
            ...shadowStyles({
              shadowColor: "#000",
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.2,
              shadowRadius: 5,
            }),
            position: "absolute",
            bottom: 16,
            right: 16,
          },
        ]}
      >
        <TouchableOpacity
          onPress={() => router.push("/(screens)/Recipe/CreateRecipe")}
        >
          <Ionicons name="add" size={24} color="pink" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Index;

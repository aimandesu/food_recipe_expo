import React, { useEffect } from "react";
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
} from "react-native";
import { Category } from "../utils/enum";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import SearchingBar from "../components/SearchingBar";
import { BtnStyles, shadowStyles } from "../utils/custom_styles";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store/store";
import { fetchRecipes, RecipesState } from "../store/recipe/RecipeSlice";

const Index = () => {
  const width = Dimensions.get("window").width;
  var height = Dimensions.get("window").height;

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
              input=""
              onInputChange={(k: string) => {
                console.log(k);
              }}
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
            <Button
              title="Go to Profile"
              onPress={() => router.push("/RecipeDetails")}
            />
          </View>
        }
        data={recipes.recipes}
        keyExtractor={(item, index) => index.toString()}
        numColumns={2}
        renderItem={({ item, index }) => (
          <TouchableOpacity
            onPress={() =>
              router.push({
                pathname: "/[CategoryDetails]",
                params: { CategoryDetails: item.tag },
              })
            }
            style={[
              {
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
              },
            ]}
          >
            {/* <Image
              source={{
                uri: Asset.fromModule(
                  "../../assets/recipe/chocolate_lava_cake.jpg"
                ).uri,
              }}
            /> */}
            {/* <Image source={{ uri: item.recipes[index].image }} /> */}
            <Text
              style={{
                color: "red",
                fontSize: 16,
                fontWeight: "bold",
              }}
            >
              {item.tag}
            </Text>
          </TouchableOpacity>
        )}
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
        <Ionicons
          onPress={() => router.push("/CreateRecipe")}
          name="add"
          size={24}
          color="pink"
        />
      </View>
    </View>
  );
};

export default Index;

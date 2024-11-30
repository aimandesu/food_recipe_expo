import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  ScrollView,
  TouchableOpacity,
  Image,
  Dimensions,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useLocalSearchParams } from "expo-router";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/app/store/store";
import { changeRecipe, MealSearchState } from "@/app/store/recipe/SearchSlice";
import { useGetMealsQuery } from "@/app/store/recipe/meal/MealApiSlice";
import MerchantStepper from "@/app/components/Stepper";

enum MealTabOption {
  INGREDIENTS = "Ingredients",
  INSTRUCTION = "Instruction",
  MEASUREMENTS = "Measurements",
  VIDEO = "Video",
}

const MealSearch = () => {
  const dispatch = useDispatch<AppDispatch>();
  const searchResult: MealSearchState = useSelector(
    (state: RootState) => state.searchMeal
  );

  const { keyword } = useLocalSearchParams<{
    keyword: string;
  }>();

  const { data, isLoading, error } = useGetMealsQuery(keyword, {
    skip: !keyword, // Avoid unnecessary calls when searchTerm is empty
  });

  const width = Dimensions.get("window").width;
  const height = Dimensions.get("window").height;

  const [selectedTab, setSelectedTab] = useState<MealTabOption>(
    MealTabOption.INGREDIENTS
  );

  // useEffect(() => {
  //   if (keyword) {
  //     // dispatch();
  //   }
  // }, [keyword, dispatch]);

  if (data?.meals === null)
    return (
      <View
        style={{
          display: "flex",
          flexGrow: 1,
          backgroundColor: "white",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Text
          style={{
            fontSize: 20,
          }}
        >
          Meals with the keyword: {keyword} is not found...
        </Text>
      </View>
    );

  if (isLoading)
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "white",
        }}
      >
        <ActivityIndicator size="large" color="pink" />
      </View>
    );

  return (
    // <ScrollView
    //   style={{
    //     flex: 1,
    //     // padding: 10,
    //   }}
    //   contentContainerStyle={{
    //     flexGrow: 1, // Ensures the ScrollView fills available space
    //   }}
    // >
    <View style={{ position: "relative", flex: 1 }}>
      {error && <Text>Error: {searchResult.error}</Text>}
      {data && (
        <FlatList
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            zIndex: 1,
            // backgroundColor: "rgba(0, 0, 0, 0.5)",
          }}
          showsHorizontalScrollIndicator={false}
          horizontal={true}
          data={searchResult.data.meals}
          keyExtractor={(item) => item.idMeal}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => dispatch(changeRecipe(item.idMeal))}
            >
              <View
                style={{
                  margin: 5,
                  borderRadius: 12,
                  borderColor: "pink",
                  borderWidth: 2,
                  backgroundColor:
                    searchResult.selectedMeal?.idMeal === item.idMeal
                      ? "pink"
                      : "white",
                }}
              >
                <Text
                  style={{
                    fontSize: 16,
                    padding: 5,
                    color:
                      searchResult.selectedMeal?.idMeal === item.idMeal
                        ? "white"
                        : "black",
                  }}
                >
                  {item.strMeal}
                </Text>
              </View>
            </TouchableOpacity>
          )}
        />
      )}

      <Image
        source={{ uri: searchResult.selectedMeal?.strMealThumb }}
        style={{
          alignSelf: "center",
          width: width,
          height: height / 2.5,
          borderRadius: 12,
        }}
      />
      <View
        style={{
          position: "absolute",
          top: height / 2.5 - 30,
          left: 0,
          right: 0,
          minHeight: height * 0.5,
          backgroundColor: "white",
          borderTopLeftRadius: 30,
          borderTopRightRadius: 30,
          padding: 20,
        }}
      >
        <Text
          style={{
            alignSelf: "center",
            fontSize: 25,
            color: "green",
          }}
        >
          {searchResult.selectedMeal?.strMeal}
        </Text>

        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            marginBottom: 10,
          }}
        >
          <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
            {Object.values(MealTabOption).map((tab) => (
              <TouchableOpacity
                key={tab}
                onPress={() => setSelectedTab(tab as MealTabOption)}
                style={[
                  {
                    padding: 10,
                    marginHorizontal: 5,
                    borderBottomWidth: 2,
                    borderBottomColor:
                      selectedTab === tab ? "green" : "transparent",
                  },
                ]}
              >
                <Text
                  style={{
                    color: selectedTab === tab ? "green" : "black",
                    fontWeight: "bold",
                  }}
                >
                  {tab}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {selectedTab === MealTabOption.INGREDIENTS && (
          <View>
            <Text>Ingredients List</Text>
            {/* <MerchantStepper currentStep={1} totalSteps={4} title={"test"} /> */}

            {searchResult.selectedMeal && (
              <View>
                {Object.entries(searchResult.selectedMeal)
                  .filter(
                    ([key, value]) =>
                      key.startsWith("strIngredient") && value?.trim() !== ""
                  )
                  .map(([key, value], index) => (
                    <Text key={index}>{value}</Text>
                  ))}
              </View>
            )}
          </View>
        )}

        {selectedTab === MealTabOption.INSTRUCTION && (
          <View>
            <Text>Cooking Instructions</Text>
            <Text> {searchResult.selectedMeal?.strInstructions}</Text>
          </View>
        )}

        {selectedTab === MealTabOption.MEASUREMENTS && (
          <View>
            <Text>Measurements</Text>
            <View>
              {(
                [
                  1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18,
                  19, 20,
                ] as const
              ).map((num) => {
                const ingredient =
                  searchResult.selectedMeal?.[`strIngredient${num}`];
                const measurement =
                  searchResult.selectedMeal?.[`strMeasure${num}`];

                if (ingredient && ingredient.trim() !== "") {
                  return (
                    <Text key={num}>
                      {measurement && measurement.trim() !== ""
                        ? `${measurement} `
                        : ""}
                      {ingredient}
                    </Text>
                  );
                }
                return null;
              })}
            </View>
          </View>
        )}
      </View>
    </View>
    // </ScrollView>
  );
};

export default MealSearch;

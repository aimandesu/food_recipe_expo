import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  FlatList,
  Button,
} from "react-native";
import { Category } from "../utils/enum";
import { Dimensions } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import SearchingBar from "../components/SearchingBar";
import { BtnStyles } from "../utils/custom_styles";

const Index = () => {
  var width = Dimensions.get("window").width;
  var height = Dimensions.get("window").height;
  const menuIcon = BtnStyles({
    backgroundColor: "whitesmoke",
  });
  return (
    <>
      {/* <FlatList
        horizontal={true} 
        data={Object.values(Category)}
        keyExtractor={(item, index) => index.toString()} // Unique key for each item
        renderItem={({ item }) => (
          <View style={styles.container}>
            <Text>{item}</Text>
          </View>
        )}
        contentContainerStyle={{ alignItems: "center" }}
      /> */}
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
                      return <Ionicons name="star" size={24} color="gold" />;
                    case Category.Western:
                      return (
                        <Ionicons name="restaurant" size={24} color="blue" />
                      );
                    case Category.Drinks:
                      return <Ionicons name="wine" size={24} color="purple" />;
                    case Category.Local:
                      return <Ionicons name="pizza" size={24} color="green" />;
                    case Category.Dessert:
                      return (
                        <Ionicons name="ice-cream" size={24} color="pink" />
                      );
                    default:
                      return (
                        <Ionicons name="help-circle" size={24} color="gray" />
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
        <Button
          title="Go to Zod Test"
          onPress={() => router.push("/ZodTest")}
        />
        <View>
          <Text>Recipe Details</Text>
        </View>
      </View>
    </>
  );
};

export default Index;

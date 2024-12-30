import { Ionicons } from "@expo/vector-icons";
import { router, Stack } from "expo-router";
import { TouchableOpacity, Text } from "react-native";
import { Provider } from "react-redux";
import { genericStore } from "../store/generic_store";

export default function ScreensLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          title: "Food Recipe",
          headerShadowVisible: false,
          contentStyle: {
            backgroundColor: "white",
          },
          headerStyle: {
            // backgroundColor: "red",
          },
          headerLeft: () => (
            <TouchableOpacity
              onPress={() => {
                router.push("/Profile");
                // router.push(`/Profile`);
              }}
              style={{ marginRight: 10 }}
            >
              <Ionicons name="person" size={24} />
            </TouchableOpacity>
          ),
        }}
      />
      <Stack.Screen
        name="Recipe/RecipeDetails/[id]"
        options={{
          title: "Recipe Details",
        }}
      />
      <Stack.Screen
        name="Recipe/CreateRecipe"
        options={{
          title: "Create",
          contentStyle: { backgroundColor: "white" },
        }}
      />
      <Stack.Screen
        name="Category/[CategoryDetails]"
        options={{
          title: "Categories",
          contentStyle: { backgroundColor: "white" },
          headerLeft: () => (
            <TouchableOpacity
              onPress={() => router.back()}
              style={{
                marginLeft: 10,
                padding: 5,
              }}
            >
              <Ionicons name="chevron-back-circle" size={24} color="#FF00BF" />
            </TouchableOpacity>
          ),
        }}
      />
      <Stack.Screen
        name="generic_test_head"
        options={{
          title: "GenericTestHead",
          contentStyle: { backgroundColor: "white" },
        }}
      />
      <Stack.Screen
        name="Search"
        options={{
          title: "Meal Search",
          contentStyle: { backgroundColor: "white" },
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Profile"
        options={{
          title: "Profile",
          contentStyle: { backgroundColor: "white" },
          headerShown: false,
        }}
      />
    </Stack>
  );
}

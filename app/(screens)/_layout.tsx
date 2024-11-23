import { Ionicons } from "@expo/vector-icons";
import { router, Stack } from "expo-router";
import { TouchableOpacity } from "react-native";
import { Provider } from "react-redux";
import { genericStore } from "../store/generic_store";

export default function ScreensLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          title: "Food Recipe",
          contentStyle: { backgroundColor: "white" },
        }}
      />
      <Stack.Screen
        name="Recipe/[RecipeDetails]"
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
    </Stack>
  );
}

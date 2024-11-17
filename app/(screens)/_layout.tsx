import { Ionicons } from "@expo/vector-icons";
import { router, Stack } from "expo-router";
import { TouchableOpacity } from "react-native";

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
        name="RecipeDetails"
        options={{
          title: "Recipe Details",
        }}
      />
      <Stack.Screen
        name="CreateRecipe"
        options={{
          title: "Create",
          contentStyle: { backgroundColor: "white" },
        }}
      />
      <Stack.Screen
        name="[CategoryDetails]"
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
    </Stack>
  );
}

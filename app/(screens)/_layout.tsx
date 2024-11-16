import { Stack } from "expo-router";

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
    </Stack>
  );
}

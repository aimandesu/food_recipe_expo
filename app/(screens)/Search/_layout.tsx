import { Ionicons } from "@expo/vector-icons";
import { router, Stack } from "expo-router";
import { TouchableOpacity } from "react-native";

const SearchLayout = () => {
  return (
    <Stack>
      <Stack.Screen
        name="[keyword]"
        options={{
          title: "Meal ",
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
};

export default SearchLayout;

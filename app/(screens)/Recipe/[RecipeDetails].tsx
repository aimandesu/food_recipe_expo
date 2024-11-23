import { router } from "expo-router";
import { Button, Text, View } from "react-native";

import React from "react";

const RecipeDetails = () => {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Recipe Details</Text>

      {/* <Button
        title="Go to Recipe Details"
        onPress={() =>
          router.push({
            pathname: "/screens",
            params: { id: 123 },
          })
        }
      /> */}
    </View>
  );
};

export default RecipeDetails;

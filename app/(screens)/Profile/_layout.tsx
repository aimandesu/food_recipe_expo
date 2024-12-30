import Ionicons from "@expo/vector-icons/Ionicons";
import { router, Stack } from "expo-router";
import React from "react";
import { TouchableOpacity } from "react-native";

const ProfileLayout = () => {
  return (
    <Stack>
      <Stack.Screen
        name="ProfileScreen"
        options={{
          title: "Profile",
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
        name="UpdateProfile"
        options={{
          title: "Update Profile",
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

export default ProfileLayout;

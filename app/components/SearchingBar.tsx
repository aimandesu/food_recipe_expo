import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";

import { TextInput, View } from "react-native";
import { BtnStyles } from "../utils/custom_styles";

interface SearchInput {
  input: string;
  onInputChange: (value: string) => void;
}

const SearchingBar: React.FC<SearchInput> = ({ input, onInputChange }) => {
  const searchIcon = BtnStyles({});
  const settingIcon = BtnStyles({
    borderWidth: 2,
    borderRadius: 24,
    borderColor: "whitesmoke",
    backgroundColor: "white",
  });

  return (
    <>
      <View
        style={{
          margin: 5,
          marginTop: 10,
          display: "flex",
          flexDirection: "row",
          backgroundColor: "whitesmoke",
          borderRadius: 24,
        }}
      >
        <View style={searchIcon.btnIcon}>
          <Ionicons name="search" size={24} />
        </View>
        <TextInput
          style={{
            flexGrow: 1,
          }}
          value={input}
          onChangeText={onInputChange}
        />
        <View style={settingIcon.btnIcon}>
          <Ionicons name="settings" size={24} />
        </View>
      </View>
    </>
  );
};

export default SearchingBar;

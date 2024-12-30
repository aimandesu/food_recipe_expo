import { Ionicons } from "@expo/vector-icons";
import React, { useState, useEffect } from "react";
import { TextInput, View } from "react-native";
import { BtnStyles } from "../utils/custom_styles";
import { useDebounce } from "@/hooks/useDebounce";

interface SearchInputProps {
  input: string;
  onInputChange: (value: string) => void;
  debounceDelay?: number;
  onKeyPress: () => void;
}

const SearchingBar: React.FC<SearchInputProps> = ({
  input,
  onInputChange,
  debounceDelay = 500,
  onKeyPress,
}) => {
  const [localInput, setLocalInput] = useState(input);
  const debouncedValue = useDebounce(localInput, debounceDelay);

  useEffect(() => {
    if (debouncedValue !== input) {
      onInputChange(debouncedValue);
    }
  }, [debouncedValue]);

  const searchIcon = BtnStyles({});
  const settingIcon = BtnStyles({
    borderWidth: 2,
    borderRadius: 24,
    borderColor: "whitesmoke",
    backgroundColor: "white",
  });

  return (
    <View
      style={{
        margin: 5,
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
        value={localInput}
        onChangeText={setLocalInput}
        onSubmitEditing={onKeyPress}
        placeholder="Search any recipe"
      />
      <View
        style={{
          ...settingIcon.btnIcon,
          height: 50,
          width: 50,
          alignSelf: "center",
        }}
      >
        <Ionicons name="options" size={24} />
      </View>
    </View>
  );
};

export default SearchingBar;

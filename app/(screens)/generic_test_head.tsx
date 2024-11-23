import { View, Text } from "react-native";
import React from "react";
import GenericTest from "./generic_test";
import { Provider } from "react-redux";
import { genericStore } from "../store/generic_store";

const GenericTestHead = () => {
  return (
    <Provider store={genericStore}>
      <GenericTest />
    </Provider>
  );
};

export default GenericTestHead;

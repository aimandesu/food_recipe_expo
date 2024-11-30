import React from "react";
import { View } from "react-native";
import { Provider } from "react-redux";
import { Store } from "redux";
import { createGenericSlice } from "../store/generic_slice";
import { OrderStatus, Product, RecipeDetailsTab } from "./enum";

interface ProviderWrapperProps {
  stores: Store[];
  children: React.ReactNode;
}

// Create slices for different types
export const productSlice = createGenericSlice<Product>("product", {
  id: 0,
  name: "",
  price: 0,
});

export const statusSlice = createGenericSlice<OrderStatus>(
  "status",
  OrderStatus.PENDING
);

export const countSlice = createGenericSlice<number>("count", 0);

export const recipeDetailsSlice = createGenericSlice<RecipeDetailsTab>(
  "recipeii",
  RecipeDetailsTab.Ingredients
);

const ProviderWrapper: React.FC<ProviderWrapperProps> = ({
  stores,
  children,
}) => {
  const wrappedChildren = stores.reduce(
    (acc, store) => <Provider store={store}>{acc}</Provider>,
    children
  );

  return <View style={{ flex: 1 }}>{wrappedChildren}</View>;
};

export default ProviderWrapper;

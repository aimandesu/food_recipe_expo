import { View, Text, Button } from "react-native";
import React from "react";
import { useDispatch, useSelector } from "react-redux";

import { RootState } from "../store/generic_store"; // Import your store types
import { createGenericSlice } from "../store/generic_slice";
// import {
//   countSlice,
//   OrderStatus,
//   productSlice,
//   statusSlice,
// } from "../store/generic_slice";

interface Product {
  id: number;
  name: string;
  price: number;
}

enum OrderStatus {
  PENDING = "PENDING",
  SHIPPED = "SHIPPED",
  DELIVERED = "DELIVERED",
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

const GenericTest = () => {
  const dispatch = useDispatch();

  // Select different states from our store
  const productState = useSelector((state: RootState) => state.product);
  const statusState = useSelector((state: RootState) => state.status);
  const countState = useSelector((state: RootState) => state.count);

  // Example handlers for different types
  const handleUpdateProduct = () => {
    dispatch(
      productSlice.actions.setData({
        id: 1,
        name: "New Product",
        price: 99.99,
      })
    );
  };

  const handleUpdateStatus = () => {
    dispatch(statusSlice.actions.setData(OrderStatus.SHIPPED));
  };

  const handleIncrement = () => {
    if (countState.data !== null) {
      dispatch(countSlice.actions.setData(countState.data + 1));
    }
  };

  return (
    <View style={{ padding: 20 }}>
      <Text style={{ fontSize: 20, fontWeight: "bold", marginBottom: 20 }}>
        Generic Redux Test
      </Text>

      {/* Product Section */}
      <View style={{ marginBottom: 20 }}>
        <Text style={{ fontWeight: "bold" }}>Product Data:</Text>
        {productState.loading ? (
          <Text>Loading...</Text>
        ) : productState.error ? (
          <Text style={{ color: "red" }}>{productState.error}</Text>
        ) : (
          <Text>
            {productState.data
              ? `${productState.data.name} - $${productState.data.price}`
              : "No product data"}
          </Text>
        )}
        <Button title="Update Product" onPress={handleUpdateProduct} />
      </View>

      {/* Status Section */}
      <View style={{ marginBottom: 20 }}>
        <Text style={{ fontWeight: "bold" }}>Order Status:</Text>
        {statusState.loading ? (
          <Text>Loading...</Text>
        ) : statusState.error ? (
          <Text style={{ color: "red" }}>{statusState.error}</Text>
        ) : (
          <Text>{statusState.data || "No status"}</Text>
        )}
        <Button title="Update Status" onPress={handleUpdateStatus} />
      </View>

      {/* Counter Section */}
      <View style={{ marginBottom: 20 }}>
        <Text style={{ fontWeight: "bold" }}>Counter:</Text>
        {countState.loading ? (
          <Text>Loading...</Text>
        ) : countState.error ? (
          <Text style={{ color: "red" }}>{countState.error}</Text>
        ) : (
          <Text>{countState.data?.toString() || "0"}</Text>
        )}
        <Button title="Increment" onPress={handleIncrement} />
      </View>
    </View>
  );
};

export default GenericTest;

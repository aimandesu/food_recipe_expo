import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Generic interface for the slice state
interface GenericState<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
}

// Function to create a generic slice
export const createGenericSlice = <T,>(name: string, initialState: T) => {
  // Create initial state with the generic type
  const sliceInitialState: GenericState<T> = {
    data: initialState,
    loading: false,
    error: null,
  };

  const slice = createSlice({
    name,
    initialState: sliceInitialState,
    reducers: {
      setData: (state, action) => {
        state.data = action.payload;
        state.loading = false;
        state.error = null;
      },
      setLoading: (state, action: PayloadAction<boolean>) => {
        state.loading = action.payload;
      },
      setError: (state, action: PayloadAction<string>) => {
        state.error = action.payload;
        state.loading = false;
      },
    },
  });

  return {
    ...slice,
    actions: {
      ...slice.actions,
    },
  };
};

// // Define some example types we'll use
// export interface Product {
//   id: number;
//   name: string;
//   price: number;
// }

// export enum OrderStatus {
//   PENDING = "PENDING",
//   SHIPPED = "SHIPPED",
//   DELIVERED = "DELIVERED",
// }

// // Create slices for different types
// export const productSlice = createGenericSlice<Product>("product", {
//   id: 0,
//   name: "",
//   price: 0,
// });

// export const statusSlice = createGenericSlice<OrderStatus>(
//   "status",
//   OrderStatus.PENDING
// );

// export const countSlice = createGenericSlice<number>("count", 0);

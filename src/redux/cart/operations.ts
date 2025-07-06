// redux/cart/operations.ts

import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  CartData,
  UpdateCartItemParams,
  PlaceOrderParams,
  OrderResponse,
} from "@/types/cart";

// Fetch cart data
export const fetchCartData = createAsyncThunk<
  CartData,
  void,
  { rejectValue: string }
>("cart/fetchCartData", async (_, { rejectWithValue }) => {
  try {
    const response = await fetch("/api/cart", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });

    if (!response.ok) {
      if (response.status === 401) {
        throw new Error("Unauthorized");
      }
      throw new Error("Failed to fetch cart data");
    }

    const result = await response.json();

    if (!result.success) {
      throw new Error(result.error || "Failed to fetch cart data");
    }

    return result.data as CartData;
  } catch (error) {
    return rejectWithValue(
      error instanceof Error ? error.message : "Unknown error occurred"
    );
  }
});

// Update cart item
export const updateCartData = createAsyncThunk<
  CartData,
  UpdateCartItemParams,
  { rejectValue: string }
>(
  "cart/updateCartItem",
  async ({ productId, quantity, action }, { rejectWithValue }) => {
    try {
      const response = await fetch("/api/cart", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          productId,
          quantity,
          action,
        }),
      });

      const result = await response.json();

      if (!result.success) {
        throw new Error(result.error || "Failed to update cart item");
      }

      return result.data as CartData;
    } catch (error) {
      return rejectWithValue(
        error instanceof Error ? error.message : "Unknown error occurred"
      );
    }
  }
);

// Place order
export const placeOrder = createAsyncThunk<
  OrderResponse,
  PlaceOrderParams,
  { rejectValue: string }
>(
  "cart/placeOrder",
  async ({ shippingInfo, paymentMethod }, { rejectWithValue }) => {
    try {
      const response = await fetch("/api/cart/checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          shippingInfo,
          paymentMethod,
        }),
      });

      const result = await response.json();

      if (!result.success) {
        throw new Error(result.error || "Failed to place order");
      }

      return result.data as OrderResponse;
    } catch (error) {
      return rejectWithValue(
        error instanceof Error ? error.message : "Unknown error occurred"
      );
    }
  }
);

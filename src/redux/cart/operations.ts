import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  CartData,
  UpdateCartItemParams,
  CheckoutRequest,
  OrderResponse,
} from "@/types/cart";

export const addToCart = createAsyncThunk<
  CartData,
  { productId: string; quantity: number; discountPrice?: number },
  { rejectValue: string }
>(
  "cart/addToCart",
  async ({ productId, quantity, discountPrice }, { rejectWithValue }) => {
    try {
      const response = await fetch("/api/cart", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          productId,
          quantity,
          customPrice: discountPrice,
        }),
      });

      if (!response.ok) {
        if (response.status === 401) {
          throw new Error("Unauthorized");
        }
        throw new Error("Failed to add item to cart");
      }

      const result = await response.json();

      if (!result.success) {
        throw new Error(result.error || "Failed to add item to cart");
      }

      return result.data as CartData;
    } catch (error) {
      return rejectWithValue(
        error instanceof Error ? error.message : "Unknown error occurred"
      );
    }
  }
);

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

export const updateCartData = createAsyncThunk<
  CartData,
  UpdateCartItemParams & { discountPrice?: number },
  { rejectValue: string }
>(
  "cart/updateCartItem",
  async (
    { productId, quantity, action, discountPrice },
    { rejectWithValue }
  ) => {
    try {
      const response = await fetch("/api/cart/update", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          productId,
          quantity,
          action,
          customPrice: discountPrice,
        }),
      });

      if (!response.ok) {
        if (response.status === 401) {
          throw new Error("Unauthorized");
        }
        throw new Error("Failed to update cart item");
      }

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

export const placeOrder = createAsyncThunk<
  OrderResponse,
  CheckoutRequest,
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

      if (!response.ok) {
        if (response.status === 401) {
          throw new Error("Unauthorized");
        }
        throw new Error("Failed to place order");
      }

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

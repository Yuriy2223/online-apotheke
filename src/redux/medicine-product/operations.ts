import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  MedicineProductDetails,
  MedicineProductDetailsReview,
  MedicineProductReviewsResponse,
} from "@/types/medicine-products";

export const fetchMedicineProductDetails = createAsyncThunk<
  MedicineProductDetails,
  string,
  { rejectValue: string }
>("medicineProduct/fetchDetails", async (productId, { rejectWithValue }) => {
  try {
    const response = await fetch(`/api/medicine-products/${productId}`);

    if (!response.ok) {
      throw new Error("Failed to fetch product details");
    }

    const data = await response.json();

    if (!data.success || !data.product) {
      throw new Error(data.error || "Invalid product details response");
    }

    return data.product as MedicineProductDetails;
  } catch (error) {
    return rejectWithValue(
      error instanceof Error ? error.message : "Unknown error occurred"
    );
  }
});

export const fetchMedicineProductReviews = createAsyncThunk<
  MedicineProductReviewsResponse,
  string,
  { rejectValue: string }
>("medicineProduct/fetchReviews", async (productId, { rejectWithValue }) => {
  try {
    const response = await fetch(`/api/medicine-products/${productId}/reviews`);

    if (!response.ok) {
      throw new Error("Failed to fetch reviews");
    }

    const data = await response.json();

    if (!data.success || !data.reviews || !data.pagination) {
      throw new Error(data.error || "Invalid reviews response");
    }

    return {
      reviews: data.reviews as MedicineProductDetailsReview[],
      pagination: data.pagination,
    };
  } catch (error) {
    return rejectWithValue(
      error instanceof Error ? error.message : "Unknown error occurred"
    );
  }
});

export const addToCart = createAsyncThunk<
  { success: boolean; message: string },
  { productId: string; quantity: number },
  { rejectValue: string }
>(
  "medicineProduct/addToCart",
  async ({ productId, quantity }, { rejectWithValue }) => {
    try {
      const response = await fetch("/api/cart", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ productId, quantity }),
      });

      if (!response.ok) {
        throw new Error("Failed to add product to cart");
      }

      const data = await response.json();

      if (!data.success) {
        throw new Error(data.error || "Failed to add product to cart");
      }

      return {
        success: true,
        message: data.message || "Product added to cart",
      };
    } catch (error) {
      return rejectWithValue(
        error instanceof Error ? error.message : "Unknown error occurred"
      );
    }
  }
);

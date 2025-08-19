import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  MedicineProductDetails,
  MedicineProductDetailsReviewWithUser,
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
  { productId: string; page?: number; limit?: number },
  { rejectValue: string }
>(
  "medicineProduct/fetchReviews",
  async ({ productId, page = 1, limit = 5 }, { rejectWithValue }) => {
    try {
      const response = await fetch(
        `/api/medicine-products/${productId}/reviews?page=${page}&limit=${limit}`
      );

      if (!response.ok) {
        throw new Error("Failed to fetch reviews");
      }

      const data = await response.json();

      if (!data.success || !data.reviews || !data.pagination) {
        throw new Error(data.error || "Invalid reviews response");
      }

      return {
        reviews: data.reviews as MedicineProductDetailsReviewWithUser[],
        pagination: {
          currentPage: data.pagination.currentPage,
          totalPages: data.pagination.totalPages,
          totalCount: data.pagination.totalReviews,
          limit,
        },
      };
    } catch (error) {
      return rejectWithValue(
        error instanceof Error ? error.message : "Unknown error occurred"
      );
    }
  }
);

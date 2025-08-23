import { PromotionParams, PromotionResponse } from "@/types/medicine-products";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const fetchProductsBySearch = createAsyncThunk<
  PromotionResponse,
  PromotionParams,
  { rejectValue: string }
>("search/fetchPromotionProducts", async (params = {}, { rejectWithValue }) => {
  try {
    const { page = 1, limit = 12, search = "", discount } = params;

    const searchParams = new URLSearchParams({
      page: page.toString(),
      limit: limit.toString(),
      ...(search && { search }),
      ...(discount && { discount }),
    });

    const response = await fetch(`/api/medicine-products?${searchParams}`);

    if (!response.ok) {
      throw new Error("Failed to fetch products");
    }

    const data: PromotionResponse = await response.json();
    return data;
  } catch (error) {
    return rejectWithValue(
      error instanceof Error ? error.message : "Unknown error occurred"
    );
  }
});

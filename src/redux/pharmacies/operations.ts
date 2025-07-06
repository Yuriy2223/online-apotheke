import { Pharmacie } from "@/types/pharmacies";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "../store";

interface FetchPharmaciesResponse {
  pharmacies: Pharmacie[];
  totalCount: number;
  currentPage: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
  limit: number;
}

export const fetchPharmacies = createAsyncThunk<
  FetchPharmaciesResponse,
  { page: number; limit: number },
  { state: RootState }
>(
  "pharmacies/fetchPharmacies",
  async ({ page = 1, limit = 10 }, { rejectWithValue }) => {
    try {
      const res = await fetch(`/api/pharmacies?page=${page}&limit=${limit}`);
      if (!res.ok) throw new Error("Failed to fetch pharmacies");

      const response: FetchPharmaciesResponse = await res.json();
      return response;
    } catch (error: unknown) {
      if (error instanceof Error) {
        return rejectWithValue(error.message);
      }
      return rejectWithValue("Unknown error");
    }
  }
);

import { PharmacieNearest } from "@/types/pharmacies";
import { ReviewHome } from "@/types/reviews";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "../store";

export const fetchPharmacieNearest = createAsyncThunk<
  PharmacieNearest[],
  void,
  { state: RootState }
>(
  "home/fetchPharmacieNearest",
  async (_, { rejectWithValue }) => {
    try {
      const res = await fetch("/api/pharmacies/nearest");
      if (!res.ok) throw new Error("Failed to fetch pharmacies");

      const data = await res.json();

      return data.pharmacies;
    } catch (error: unknown) {
      if (error instanceof Error) {
        return rejectWithValue(error.message);
      }
      return rejectWithValue("Unknown error");
    }
  },
  {
    condition: (_, { getState }) => {
      const { pharmacies } = getState().home;
      return pharmacies.length === 0;
    },
  }
);

export const fetchReviewsHome = createAsyncThunk<
  ReviewHome[],
  void,
  { state: RootState }
>(
  "reviewsHome/fetchReviewsHome",
  async (_, { rejectWithValue }) => {
    try {
      const res = await fetch("/api/reviews-home");
      if (!res.ok) throw new Error("Failed to fetch reviews");
      const data: ReviewHome[] = await res.json();
      return data;
    } catch (error: unknown) {
      if (error instanceof Error) {
        return rejectWithValue(error.message);
      }
      return rejectWithValue("Unknown error");
    }
  },
  {
    condition: (_, { getState }) => {
      const { reviews } = getState().home;
      return reviews.length === 0;
    },
  }
);

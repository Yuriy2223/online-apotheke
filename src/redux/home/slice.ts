import { createSlice } from "@reduxjs/toolkit";
import { fetchPharmacieNearest, fetchReviewsHome } from "./operations";
import { ReviewHome } from "@/types/reviews";
import { PharmacieNearest } from "@/types/pharmacies";

interface HomeState {
  reviews: ReviewHome[];
  pharmacies: PharmacieNearest[];
  isLoading: boolean;
  error: string | null;
}

const initialState: HomeState = {
  reviews: [],
  pharmacies: [],
  isLoading: false,
  error: null,
};

const homeSlice = createSlice({
  name: "home",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder

      .addCase(fetchReviewsHome.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchReviewsHome.fulfilled, (state, action) => {
        state.reviews = action.payload;
        state.isLoading = false;
      })
      .addCase(fetchReviewsHome.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message ?? "Unknown error";
      })

      .addCase(fetchPharmacieNearest.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchPharmacieNearest.fulfilled, (state, action) => {
        state.pharmacies = action.payload;
        state.isLoading = false;
      })
      .addCase(fetchPharmacieNearest.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message ?? "Unknown error";
      });
  },
});

export const homeReducer = homeSlice.reducer;

import { Pharmacie } from "@/types/pharmacies";
import { createSlice } from "@reduxjs/toolkit";
import { fetchPharmacies } from "./operations";

interface PharmacieState {
  items: Pharmacie[];
  loading: boolean;
  error: string | null;
  pagination: {
    currentPage: number;
    totalPages: number;
    totalCount: number;
    hasNextPage: boolean;
    hasPrevPage: boolean;
    limit: number;
  } | null;
}

const initialState: PharmacieState = {
  items: [],
  loading: false,
  error: null,
  pagination: null,
};

const pharmacieSlice = createSlice({
  name: "pharmacies",
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPharmacies.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPharmacies.fulfilled, (state, action) => {
        const {
          pharmacies,
          currentPage,
          totalPages,
          totalCount,
          hasNextPage,
          hasPrevPage,
          limit,
        } = action.payload;

        state.items = pharmacies;
        state.loading = false;
        state.pagination = {
          currentPage,
          totalPages,
          totalCount,
          hasNextPage,
          hasPrevPage,
          limit,
        };
      })
      .addCase(fetchPharmacies.rejected, (state, action) => {
        state.loading = false;
        state.error = (action.payload as string) ?? "Unknown error";
      });
  },
});

export const { clearError } = pharmacieSlice.actions;
export const pharmaciesReducer = pharmacieSlice.reducer;

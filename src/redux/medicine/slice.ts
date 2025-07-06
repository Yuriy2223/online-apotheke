import { createSlice } from "@reduxjs/toolkit";
import { MedicineProduct } from "@/types/medicine-products";
import { PaginationData } from "@/types/pagination";
import { fetchMedicinesProducts } from "./operations";

export interface MedicineProductsState {
  products: MedicineProduct[];
  pagination: PaginationData | null;
  loading: boolean;
  error: string | null;
}

const initialState: MedicineProductsState = {
  products: [],
  pagination: null,
  loading: false,
  error: null,
};

const medicineProductsSlice = createSlice({
  name: "medicineProducts",
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    resetProducts: (state) => {
      state.products = [];
      state.pagination = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMedicinesProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMedicinesProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload.products;
        state.pagination = action.payload.pagination;
      })
      .addCase(fetchMedicinesProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to fetch medicines";
        state.pagination = null;
      });
  },
});

export const { clearError, resetProducts } = medicineProductsSlice.actions;
export const medicineProductsReducer = medicineProductsSlice.reducer;

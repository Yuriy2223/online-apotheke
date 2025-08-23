import { createSlice } from "@reduxjs/toolkit";
import { PromotionProduct } from "@/types/medicine-products";
import { fetchProductsBySearch } from "./operation";
import { PaginationData } from "@/types/pagination";

export interface SearchState {
  products: PromotionProduct[];
  loading: boolean;
  error: string | null;
  pagination: PaginationData | null;
}

const initialState: SearchState = {
  products: [],
  pagination: null,
  loading: false,
  error: null,
};

const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    clearSearch: (state) => {
      state.products = [];
      state.error = null;
      state.pagination = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProductsBySearch.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProductsBySearch.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload.products;
        state.pagination = action.payload.pagination;
        state.error = null;
      })
      .addCase(fetchProductsBySearch.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to fetch products";
      });
  },
});

export const { clearSearch } = searchSlice.actions;
export const searchReducer = searchSlice.reducer;

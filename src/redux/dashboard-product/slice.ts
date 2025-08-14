import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { MedicineProduct } from "@/types/medicine-products";
import { PaginationData } from "@/types/pagination";
import {
  fetchDashboardProducts,
  createDashboardProduct,
  updateDashboardProduct,
  deleteDashboardProduct,
} from "./operations";

export interface ProductsState {
  products: MedicineProduct[];
  categories: string[];
  pagination: PaginationData | null;
  filters: {
    search: string;
    category: string;
    sortBy: string;
    page: number;
    limit: number;
  };
  loading: boolean;
  error: string | null;
}

const initialState: ProductsState = {
  products: [],
  categories: [],
  pagination: null,
  filters: {
    search: "",
    category: "",
    sortBy: "name",
    page: 1,
    limit: 12,
  },
  loading: false,
  error: null,
};

const dashboardProductSlice = createSlice({
  name: "dashboardProducts",
  initialState,
  reducers: {
    setFilters: (
      state,
      action: PayloadAction<Partial<ProductsState["filters"]>>
    ) => {
      state.filters = { ...state.filters, ...action.payload };
      if (action.payload.page === undefined) {
        state.filters.page = 1;
      }
    },
    resetFilters: (state) => {
      state.filters = initialState.filters;
    },
    clearError: (state) => {
      state.error = null;
    },
    setPage: (state, action: PayloadAction<number>) => {
      state.filters.page = action.payload;
    },
  },
  extraReducers: (builder) => {
    // Fetch Products
    builder
      .addCase(fetchDashboardProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchDashboardProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload.products;
        state.categories = action.payload.categories;
        state.pagination = action.payload.pagination;
      })
      .addCase(fetchDashboardProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // Create Product
      .addCase(createDashboardProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createDashboardProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.products.unshift(action.payload.product);
        if (state.pagination) {
          state.pagination.totalCount += 1;
        }
      })
      .addCase(createDashboardProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // Update Product
      .addCase(updateDashboardProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateDashboardProduct.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.products.findIndex(
          (p) => p._id === action.payload.product._id
        );
        if (index !== -1) {
          state.products[index] = action.payload.product;
        }
      })
      .addCase(updateDashboardProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // Delete Product
      .addCase(deleteDashboardProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteDashboardProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.products = state.products.filter(
          (p) => p._id !== action.meta.arg
        );
        if (state.pagination) {
          state.pagination.totalCount -= 1;
        }
      })
      .addCase(deleteDashboardProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { setFilters, resetFilters, clearError, setPage } =
  dashboardProductSlice.actions;

export const dashboardProductReducer = dashboardProductSlice.reducer;

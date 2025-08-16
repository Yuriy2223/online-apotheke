import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { PaginationData } from "@/types/pagination";
import { Supplier } from "@/types/suppliers";
import {
  fetchDashboardSuppliers,
  createDashboardSupplier,
  updateDashboardSupplier,
} from "./operations";

export interface SuppliersState {
  suppliers: Supplier[];
  statuses: string[];
  pagination: PaginationData | null;
  filters: {
    search: string;
    status: string;
    sortBy: string;
    page: number;
    limit: number;
  };
  loading: boolean;
  error: string | null;
}

const initialState: SuppliersState = {
  suppliers: [],
  statuses: [],
  pagination: null,
  filters: {
    search: "",
    status: "",
    sortBy: "name",
    page: 1,
    limit: 12,
  },
  loading: false,
  error: null,
};

const dashboardSupplierSlice = createSlice({
  name: "dashboardSuppliers",
  initialState,
  reducers: {
    setFilters: (
      state,
      action: PayloadAction<Partial<SuppliersState["filters"]>>
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
    builder
      .addCase(fetchDashboardSuppliers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchDashboardSuppliers.fulfilled, (state, action) => {
        state.loading = false;
        state.suppliers = action.payload.suppliers;
        state.statuses = action.payload.statuses;
        state.pagination = action.payload.pagination;
      })
      .addCase(fetchDashboardSuppliers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      .addCase(createDashboardSupplier.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createDashboardSupplier.fulfilled, (state, action) => {
        state.loading = false;
        state.suppliers.unshift(action.payload.supplier);
        if (state.pagination) {
          state.pagination.totalCount += 1;
        }
      })
      .addCase(createDashboardSupplier.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      .addCase(updateDashboardSupplier.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateDashboardSupplier.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.suppliers.findIndex(
          (p) => p._id === action.payload.supplier._id
        );
        if (index !== -1) {
          state.suppliers[index] = action.payload.supplier;
        }
      })
      .addCase(updateDashboardSupplier.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { setFilters, resetFilters, clearError, setPage } =
  dashboardSupplierSlice.actions;

export const dashboardSupplierReducer = dashboardSupplierSlice.reducer;

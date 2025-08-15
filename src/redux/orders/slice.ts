import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { PaginationData } from "@/types/pagination";
import { fetchDashboardOrders } from "./operations";
import { Order } from "@/types/orders";

export interface ProductsState {
  orders: Order[];
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

const initialState: ProductsState = {
  orders: [],
  statuses: [],
  pagination: null,
  filters: {
    search: "",
    status: "",
    sortBy: "order_date",
    page: 1,
    limit: 12,
  },
  loading: false,
  error: null,
};

const dashboardOrdersSlice = createSlice({
  name: "dashboardOrders",
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
    builder
      .addCase(fetchDashboardOrders.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchDashboardOrders.fulfilled, (state, action) => {
        state.loading = false;
        state.orders = action.payload.orders;
        state.statuses = action.payload.statuses;
        state.pagination = action.payload.pagination;
      })
      .addCase(fetchDashboardOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { setFilters, resetFilters, clearError, setPage } =
  dashboardOrdersSlice.actions;

export const dashboardOrdersReducer = dashboardOrdersSlice.reducer;

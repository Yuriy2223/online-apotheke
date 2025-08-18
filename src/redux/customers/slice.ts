// import { createSlice, PayloadAction } from "@reduxjs/toolkit";
// import { PaginationData } from "@/types/pagination";
// import { Customer } from "@/types/customers";
// import { fetchDashboardCustomers } from "./operations";

// export interface CustomersState {
//   customers: Customer[];
//   pagination: PaginationData | null;
//   filters: {
//     search: string;
//     sortBy: string;
//     page: number;
//     limit: number;
//   };
//   loading: boolean;
//   error: string | null;
// }

// const initialState: CustomersState = {
//   customers: [],
//   pagination: null,
//   filters: {
//     search: "",
//     sortBy: "name",
//     page: 1,
//     limit: 12,
//   },
//   loading: false,
//   error: null,
// };

// const dashboardCustomersSlice = createSlice({
//   name: "dashboardCustomers",
//   initialState,
//   reducers: {
//     setFilters: (
//       state,
//       action: PayloadAction<Partial<CustomersState["filters"]>>
//     ) => {
//       state.filters = { ...state.filters, ...action.payload };
//       if (action.payload.page === undefined) {
//         state.filters.page = 1;
//       }
//     },
//     resetFilters: (state) => {
//       state.filters = initialState.filters;
//     },
//     clearError: (state) => {
//       state.error = null;
//     },
//     setPage: (state, action: PayloadAction<number>) => {
//       state.filters.page = action.payload;
//     },
//   },
//   extraReducers: (builder) => {
//     builder
//       .addCase(fetchDashboardCustomers.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(fetchDashboardCustomers.fulfilled, (state, action) => {
//         state.loading = false;
//         state.customers = action.payload.customers;
//         state.pagination = action.payload.pagination;
//       })
//       .addCase(fetchDashboardCustomers.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload as string;
//       });
//   },
// });

// export const { setFilters, resetFilters, clearError, setPage } =
//   dashboardCustomersSlice.actions;

// export const dashboardCustomersReducer = dashboardCustomersSlice.reducer;

/*********************************** */

import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { PaginationData } from "@/types/pagination";
import { Customer } from "@/types/customers";
import { fetchDashboardCustomers, fetchRecentCustomers } from "./operations";

export interface CustomersState {
  customers: Customer[];
  recentCustomers: Customer[]; // додаємо окреме поле для recent customers
  pagination: PaginationData | null;
  filters: {
    search: string;
    sortBy: string;
    page: number;
    limit: number;
  };
  loading: boolean;
  recentLoading: boolean; // окремий лоадінг для recent customers
  error: string | null;
}

const initialState: CustomersState = {
  customers: [],
  recentCustomers: [], // ініціалізуємо порожнім масивом
  pagination: null,
  filters: {
    search: "",
    sortBy: "name",
    page: 1,
    limit: 12,
  },
  loading: false,
  recentLoading: false,
  error: null,
};

const dashboardCustomersSlice = createSlice({
  name: "dashboardCustomers",
  initialState,
  reducers: {
    setFilters: (
      state,
      action: PayloadAction<Partial<CustomersState["filters"]>>
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
      // Існуючі екшени для основного списку клієнтів
      .addCase(fetchDashboardCustomers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchDashboardCustomers.fulfilled, (state, action) => {
        state.loading = false;
        state.customers = action.payload.customers;
        state.pagination = action.payload.pagination;
      })
      .addCase(fetchDashboardCustomers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Нові екшени для Recent Customers
      .addCase(fetchRecentCustomers.pending, (state) => {
        state.recentLoading = true;
        state.error = null;
      })
      .addCase(fetchRecentCustomers.fulfilled, (state, action) => {
        state.recentLoading = false;
        state.recentCustomers = action.payload;
      })
      .addCase(fetchRecentCustomers.rejected, (state, action) => {
        state.recentLoading = false;
        state.error = action.payload as string;
      });
  },
});

export const { setFilters, resetFilters, clearError, setPage } =
  dashboardCustomersSlice.actions;

export const dashboardCustomersReducer = dashboardCustomersSlice.reducer;

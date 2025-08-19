import { RootState } from "@/redux/store";

export const selectCustomers = (state: RootState) =>
  state.dashboardCustomers.customers;

export const selectRecentCustomers = (state: RootState) =>
  state.dashboardCustomers.recentCustomers;

export const selectFilters = (state: RootState) =>
  state.dashboardCustomers.filters;

export const selectLoading = (state: RootState) =>
  state.dashboardCustomers.loading;

export const selectRecentLoading = (state: RootState) =>
  state.dashboardCustomers.recentLoading;

export const selectError = (state: RootState) => state.dashboardCustomers.error;

export const selectPagination = (state: RootState) =>
  state.dashboardCustomers.pagination;

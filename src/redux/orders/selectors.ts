import { RootState } from "@/redux/store";

export const selectOrders = (state: RootState) => state.dashboardOrders.orders;

export const selectFilters = (state: RootState) =>
  state.dashboardOrders.filters;

export const selectStatuses = (state: RootState) =>
  state.dashboardOrders.statuses;

export const selectLoading = (state: RootState) =>
  state.dashboardOrders.loading;

export const selectError = (state: RootState) => state.dashboardOrders.error;

export const selectPagination = (state: RootState) =>
  state.dashboardOrders.pagination;

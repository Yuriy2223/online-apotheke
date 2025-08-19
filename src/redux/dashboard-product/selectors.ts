import { RootState } from "@/redux/store";

export const selectProducts = (state: RootState) =>
  state.dashboardProducts.products;

export const selectCategories = (state: RootState) =>
  state.dashboardProducts.categories;

export const selectPagination = (state: RootState) =>
  state.dashboardProducts.pagination;

export const selectFilters = (state: RootState) =>
  state.dashboardProducts.filters;

export const selectLoading = (state: RootState) =>
  state.dashboardProducts.loading;

export const selectError = (state: RootState) => state.dashboardProducts.error;

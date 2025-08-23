import { RootState } from "@/redux/store";

export const selectSearchProducts = (state: RootState) => state.search.products;

export const selectSearchLoading = (state: RootState) => state.search.loading;

export const selectSearchError = (state: RootState) => state.search.error;

export const selectSearchPagination = (state: RootState) =>
  state.search.pagination;

import { RootState } from "../store";

export const selectPharmacies = (state: RootState) => state.pharmacies.items;
export const selectPharmaciesLoading = (state: RootState) =>
  state.pharmacies.loading;
export const selectPharmaciesError = (state: RootState) =>
  state.pharmacies.error;
export const selectPharmaciesPagination = (state: RootState) =>
  state.pharmacies.pagination;

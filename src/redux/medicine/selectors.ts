import { RootState } from "@/redux/store";

export const selectMedicineProducts = (state: RootState) =>
  state.medicineProducts.products;

export const selectMedicineProductsPagination = (state: RootState) =>
  state.medicineProducts.pagination;

export const selectMedicineProductsLoading = (state: RootState) =>
  state.medicineProducts.loading;

export const selectMedicineProductsError = (state: RootState) =>
  state.medicineProducts.error;

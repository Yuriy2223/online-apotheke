import { RootState } from "@/redux/store";

export const selectSuppliers = (state: RootState) =>
  state.dashboardSuppliers.suppliers;

export const selectStatuses = (state: RootState) =>
  state.dashboardSuppliers.statuses;

export const selectPagination = (state: RootState) =>
  state.dashboardSuppliers.pagination;

export const selectFilters = (state: RootState) =>
  state.dashboardSuppliers.filters;

export const selectLoading = (state: RootState) =>
  state.dashboardSuppliers.loading;

export const selectError = (state: RootState) => state.dashboardSuppliers.error;

export const selectSupplierById = (state: RootState, supplierId: string) =>
  state.dashboardSuppliers.suppliers.find(
    (supplier) => supplier._id === supplierId
  );

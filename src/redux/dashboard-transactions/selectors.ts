import { RootState } from "@/redux/store";

export const selectRecentTransactions = (state: RootState) =>
  state.dashboardTransactions.recentTransactions;

export const selectTransactionsLoading = (state: RootState) =>
  state.dashboardTransactions.loading;

export const selectTransactionsError = (state: RootState) =>
  state.dashboardTransactions.error;

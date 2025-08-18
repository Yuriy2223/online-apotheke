import { RootState } from "@/redux/store";

export const selectStatistics = (state: RootState) =>
  state.dashboardStatistics.statistics;

export const selectStatisticsLoading = (state: RootState) =>
  state.dashboardStatistics.loading;

export const selectStatisticsError = (state: RootState) =>
  state.dashboardStatistics.error;

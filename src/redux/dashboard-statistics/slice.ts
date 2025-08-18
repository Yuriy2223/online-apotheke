import { createSlice } from "@reduxjs/toolkit";
import { fetchDashboardStatistics } from "./operations";

export interface StatisticItem {
  icon: "Package" | "Truck" | "Users";
  label: string;
  value: number;
}

export interface DashboardStatisticsState {
  statistics: StatisticItem[];
  loading: boolean;
  error: string | null;
}

const initialState: DashboardStatisticsState = {
  statistics: [],
  loading: false,
  error: null,
};

const dashboardStatisticsSlice = createSlice({
  name: "dashboardStatistics",
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchDashboardStatistics.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchDashboardStatistics.fulfilled, (state, action) => {
        state.loading = false;
        state.statistics = action.payload;
      })
      .addCase(fetchDashboardStatistics.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { clearError } = dashboardStatisticsSlice.actions;
export const dashboardStatisticsReducer = dashboardStatisticsSlice.reducer;

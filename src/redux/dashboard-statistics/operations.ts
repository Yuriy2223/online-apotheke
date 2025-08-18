import { createAsyncThunk } from "@reduxjs/toolkit";

const handleApiError = (error: unknown, defaultMessage: string): string => {
  if (error instanceof Error) {
    return error.message;
  }
  if (typeof error === "string") {
    return error;
  }
  return defaultMessage;
};

export const fetchDashboardStatistics = createAsyncThunk(
  "dashboardStatistics/fetchDashboardStatistics",
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch("/api/dashboard/statistics");

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      if (!data.success) {
        throw new Error(data.error || "Failed to fetch statistics");
      }

      return data.statistics;
    } catch (error) {
      return rejectWithValue(
        handleApiError(error, "Failed to fetch statistics")
      );
    }
  }
);

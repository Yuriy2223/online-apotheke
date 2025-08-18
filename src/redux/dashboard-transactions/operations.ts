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

export const fetchRecentTransactions = createAsyncThunk(
  "dashboardTransactions/fetchDashboardTransactions",
  async (_, { rejectWithValue }) => {
    try {
      const searchParams = new URLSearchParams();
      searchParams.set("limit", "7");

      const response = await fetch(
        `/api/dashboard/transactions?${searchParams}`
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      return data.transactions;
    } catch (error) {
      return rejectWithValue(
        handleApiError(error, "Failed to fetch recent transactions")
      );
    }
  }
);

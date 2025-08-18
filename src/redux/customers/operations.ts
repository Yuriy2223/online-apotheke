import { createAsyncThunk } from "@reduxjs/toolkit";

interface FetchCustomersParams {
  search?: string;
  sortBy?: string;
  page?: number;
  limit?: number;
}

const handleApiError = (error: unknown, defaultMessage: string): string => {
  if (error instanceof Error) {
    return error.message;
  }
  if (typeof error === "string") {
    return error;
  }
  return defaultMessage;
};

export const fetchDashboardCustomers = createAsyncThunk(
  "dashboardCustomers/fetchDashboardCustomers",
  async (params: FetchCustomersParams, { rejectWithValue }) => {
    try {
      const searchParams = new URLSearchParams();

      if (params.search) searchParams.set("search", params.search);
      if (params.sortBy) searchParams.set("sortBy", params.sortBy);
      if (params.page) searchParams.set("page", params.page.toString());
      if (params.limit) searchParams.set("limit", params.limit.toString());

      const response = await fetch(`/api/dashboard/customers?${searchParams}`);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      return data;
    } catch (error) {
      return rejectWithValue(
        handleApiError(error, "Failed to fetch customers")
      );
    }
  }
);

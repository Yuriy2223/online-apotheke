import { createAsyncThunk } from "@reduxjs/toolkit";

interface FetchOrdersParams {
  search?: string;
  status?: string;
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

export const fetchDashboardOrders = createAsyncThunk(
  "dashboardOrders/fetchDashboardOrders",
  async (params: FetchOrdersParams, { rejectWithValue }) => {
    try {
      const searchParams = new URLSearchParams();

      if (params.search) searchParams.set("search", params.search);
      if (params.status) searchParams.set("status", params.status);
      if (params.sortBy) searchParams.set("sortBy", params.sortBy);
      if (params.page) searchParams.set("page", params.page.toString());
      if (params.limit) searchParams.set("limit", params.limit.toString());

      const response = await fetch(`/api/dashboard/orders?${searchParams}`);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      if (!data.success) {
        throw new Error(data.error || "Failed to fetch orders");
      }

      return data;
    } catch (error) {
      return rejectWithValue(handleApiError(error, "Failed to fetch orders"));
    }
  }
);

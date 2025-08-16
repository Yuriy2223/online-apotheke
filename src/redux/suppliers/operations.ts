import { createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

interface FetchSuppliersParams {
  search?: string;
  status?: string;
  sortBy?: string;
  page?: number;
  limit?: number;
}

interface SupplierData {
  name: string;
  address: string;
  company: string;
  date: string;
  amount: number;
  status: string;
}

interface UpdateSupplierParams {
  id: string;
  data: Partial<SupplierData>;
}

// export interface Supplier {
//   _id: string;
// name: string;
// address: string;
// company: string;
// date: string;
// amount: number;
// status: string;
//   createdAt?: string;
//   updatedAt?: string;
// }

const handleApiError = (error: unknown, defaultMessage: string): string => {
  if (error instanceof Error) {
    return error.message;
  }
  if (typeof error === "string") {
    return error;
  }
  return defaultMessage;
};

export const fetchDashboardSuppliers = createAsyncThunk(
  "dashboardSuppliers/fetchDashboardSuppliers",
  async (params: FetchSuppliersParams, { rejectWithValue }) => {
    try {
      const searchParams = new URLSearchParams();

      if (params.search) searchParams.set("search", params.search);
      if (params.status) searchParams.set("status", params.status);
      if (params.sortBy) searchParams.set("sortBy", params.sortBy);
      if (params.page) searchParams.set("page", params.page.toString());
      if (params.limit) searchParams.set("limit", params.limit.toString());

      const response = await fetch(`/api/dashboard/suppliers?${searchParams}`);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      if (!data.success) {
        throw new Error(data.error || "Failed to fetch suppliers");
      }

      return data;
    } catch (error) {
      return rejectWithValue(
        handleApiError(error, "Failed to fetch suppliers")
      );
    }
  }
);

export const createDashboardSupplier = createAsyncThunk(
  "dashboardSuppliers/createDashboardSupplier",
  async (supplierData: SupplierData, { rejectWithValue }) => {
    try {
      const response = await fetch("/api/dashboard/suppliers", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(supplierData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          errorData.error || `HTTP error! status: ${response.status}`
        );
      }

      const data = await response.json();

      if (!data.success) {
        throw new Error(data.error || "Failed to create supplier");
      }
      toast.success("Supplier created successfully!");
      return data;
    } catch (error) {
      toast.error("Failed to create supplier");
      return rejectWithValue(
        handleApiError(error, "Failed to create supplier")
      );
    }
  }
);

export const updateDashboardSupplier = createAsyncThunk(
  "dashboardSuppliers/updateDashboardSupplier",
  async ({ id, data }: UpdateSupplierParams, { rejectWithValue }) => {
    try {
      const response = await fetch(`/api/dashboard/suppliers/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          errorData.error || `HTTP error! status: ${response.status}`
        );
      }

      const responseData = await response.json();

      if (!responseData.success) {
        throw new Error(responseData.error || "Failed to update supplier");
      }
      toast.success("Supplier updated successfully!");
      return responseData;
    } catch (error) {
      toast.error("Failed to update supplier");
      return rejectWithValue(
        handleApiError(error, "Failed to update supplier")
      );
    }
  }
);

export const deleteDashboardSupplier = createAsyncThunk(
  "dashboardSuppliers/deleteDashboardSupplier",
  async (id: string, { rejectWithValue }) => {
    try {
      const response = await fetch(`/api/dashboard/suppliers/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          errorData.error || `HTTP error! status: ${response.status}`
        );
      }

      const data = await response.json();

      if (!data.success) {
        throw new Error(data.error || "Failed to delete supplier");
      }
      toast.success("Supplier deleted successfully!");
      return id;
    } catch (error) {
      toast.error("Failed to delete supplier");
      return rejectWithValue(
        handleApiError(error, "Failed to delete supplier")
      );
    }
  }
);

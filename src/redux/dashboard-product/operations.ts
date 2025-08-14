import { createAsyncThunk } from "@reduxjs/toolkit";

interface FetchProductsParams {
  search?: string;
  category?: string;
  sortBy?: string;
  page?: number;
  limit?: number;
}

interface ProductData {
  name: string;
  category: string;
  stock: number;
  suppliers: string;
  price: number;
  photo?: string;
}

interface UpdateProductParams {
  id: string;
  data: Partial<ProductData>;
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

export const fetchDashboardProducts = createAsyncThunk(
  "dashboardProducts/fetchDashboardProducts",
  async (params: FetchProductsParams, { rejectWithValue }) => {
    try {
      const searchParams = new URLSearchParams();

      if (params.search) searchParams.set("search", params.search);
      if (params.category) searchParams.set("category", params.category);
      if (params.sortBy) searchParams.set("sortBy", params.sortBy);
      if (params.page) searchParams.set("page", params.page.toString());
      if (params.limit) searchParams.set("limit", params.limit.toString());

      const response = await fetch(`/api/dashboard/products?${searchParams}`);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      if (!data.success) {
        throw new Error(data.error || "Failed to fetch products");
      }

      return data;
    } catch (error) {
      return rejectWithValue(handleApiError(error, "Failed to fetch products"));
    }
  }
);

export const createDashboardProduct = createAsyncThunk(
  "dashboardProducts/createDashboardProduct",
  async (productData: ProductData, { rejectWithValue }) => {
    try {
      const response = await fetch("/api/dashboard/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(productData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          errorData.error || `HTTP error! status: ${response.status}`
        );
      }

      const data = await response.json();

      if (!data.success) {
        throw new Error(data.error || "Failed to create product");
      }

      return data;
    } catch (error) {
      return rejectWithValue(handleApiError(error, "Failed to create product"));
    }
  }
);

export const updateDashboardProduct = createAsyncThunk(
  "dashboardProducts/updateDashboardProduct",
  async ({ id, data }: UpdateProductParams, { rejectWithValue }) => {
    try {
      const response = await fetch(`/api/dashboard/products/${id}`, {
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
        throw new Error(responseData.error || "Failed to update product");
      }

      return responseData;
    } catch (error) {
      return rejectWithValue(handleApiError(error, "Failed to update product"));
    }
  }
);

export const deleteDashboardProduct = createAsyncThunk(
  "dashboardProducts/deleteDashboardProduct",
  async (id: string, { rejectWithValue }) => {
    try {
      const response = await fetch(`/api/dashboard/products/${id}`, {
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
        throw new Error(data.error || "Failed to delete product");
      }

      return id;
    } catch (error) {
      return rejectWithValue(handleApiError(error, "Failed to delete product"));
    }
  }
);

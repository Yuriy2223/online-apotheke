import { createAsyncThunk } from "@reduxjs/toolkit";
import { MedicinesParams, MedicinesResponse } from "@/types/medicine-products";

export const fetchMedicinesProducts = createAsyncThunk<
  MedicinesResponse,
  MedicinesParams,
  { rejectValue: string }
>(
  "medicineProducts/fetchMedicinesProduct",
  async (params = {}, { rejectWithValue }) => {
    try {
      const { page = 1, limit = 12, search = "", category = "" } = params;

      const searchParams = new URLSearchParams({
        page: page.toString(),
        limit: limit.toString(),
        ...(search && { search }),
        ...(category &&
          category !== "Product category" &&
          category !== "Show all" && { category }),
      });

      const response = await fetch(`/api/medicine-products?${searchParams}`);

      if (!response.ok) {
        throw new Error("Failed to fetch medicines");
      }

      const data: MedicinesResponse = await response.json();
      return data;
    } catch (error) {
      return rejectWithValue(
        error instanceof Error ? error.message : "Failed to fetch medicines"
      );
    }
  }
);

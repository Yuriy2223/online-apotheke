import { createSlice } from "@reduxjs/toolkit";
import { Transaction } from "@/types/transactions";
import { fetchRecentTransactions } from "./operations";

export interface TransactionsState {
  recentTransactions: Transaction[];
  loading: boolean;
  error: string | null;
}

const initialState: TransactionsState = {
  recentTransactions: [],
  loading: false,
  error: null,
};

const dashboardTransactionsSlice = createSlice({
  name: "dashboardTransactions",
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchRecentTransactions.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchRecentTransactions.fulfilled, (state, action) => {
        state.loading = false;
        state.recentTransactions = action.payload;
      })
      .addCase(fetchRecentTransactions.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { clearError } = dashboardTransactionsSlice.actions;
export const dashboardTransactionsReducer = dashboardTransactionsSlice.reducer;

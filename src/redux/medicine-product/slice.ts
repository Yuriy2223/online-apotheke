import { createSlice } from "@reduxjs/toolkit";
import {
  fetchMedicineProductDetails,
  fetchMedicineProductReviews,
  addToCart,
} from "./operations";
import {
  MedicineProductDetails,
  MedicineProductDetailsReview,
} from "@/types/medicine-products";

interface MedicineProductState {
  // Product details
  productDetails: MedicineProductDetails | null;
  productDetailsLoading: boolean;
  productDetailsError: string | null;

  // Reviews
  reviews: MedicineProductDetailsReview[];
  reviewsLoading: boolean;
  reviewsError: string | null;
  reviewsPagination: {
    currentPage: number;
    totalPages: number;
    totalCount: number;
    limit: number;
  } | null;

  // Cart
  addingToCart: boolean;
  addToCartError: string | null;
}

const initialState: MedicineProductState = {
  productDetails: null,
  productDetailsLoading: false,
  productDetailsError: null,

  reviews: [],
  reviewsLoading: false,
  reviewsError: null,
  reviewsPagination: null,

  addingToCart: false,
  addToCartError: null,
};

const medicineProductDetailsSlice = createSlice({
  name: "medicineProductDetails",
  initialState,
  reducers: {
    clearProductDetails: (state) => {
      state.productDetails = null;
      state.productDetailsError = null;
    },
    clearReviews: (state) => {
      state.reviews = [];
      state.reviewsError = null;
      state.reviewsPagination = null;
    },
    clearAddToCartError: (state) => {
      state.addToCartError = null;
    },
  },
  extraReducers: (builder) => {
    // Fetch product details
    builder
      .addCase(fetchMedicineProductDetails.pending, (state) => {
        state.productDetailsLoading = true;
        state.productDetailsError = null;
      })
      .addCase(fetchMedicineProductDetails.fulfilled, (state, action) => {
        state.productDetailsLoading = false;
        state.productDetails = action.payload;
        state.productDetailsError = null;
      })
      .addCase(fetchMedicineProductDetails.rejected, (state, action) => {
        state.productDetailsLoading = false;
        state.productDetailsError =
          action.payload || "Failed to fetch product details";
      });

    // Fetch reviews
    builder
      .addCase(fetchMedicineProductReviews.pending, (state) => {
        state.reviewsLoading = true;
        state.reviewsError = null;
      })
      .addCase(fetchMedicineProductReviews.fulfilled, (state, action) => {
        state.reviewsLoading = false;
        state.reviews = action.payload.reviews;
        state.reviewsPagination = action.payload.pagination;
        state.reviewsError = null;
      })
      .addCase(fetchMedicineProductReviews.rejected, (state, action) => {
        state.reviewsLoading = false;
        state.reviewsError = action.payload || "Failed to fetch reviews";
      });

    // Add to cart
    builder
      .addCase(addToCart.pending, (state) => {
        state.addingToCart = true;
        state.addToCartError = null;
      })
      .addCase(addToCart.fulfilled, (state) => {
        state.addingToCart = false;
        state.addToCartError = null;
      })
      .addCase(addToCart.rejected, (state, action) => {
        state.addingToCart = false;
        state.addToCartError = action.payload || "Failed to add to cart";
      });
  },
});

export const { clearProductDetails, clearReviews, clearAddToCartError } =
  medicineProductDetailsSlice.actions;
export const medicineProductDetailsReducer =
  medicineProductDetailsSlice.reducer;

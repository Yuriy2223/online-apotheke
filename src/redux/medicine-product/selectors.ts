import { RootState } from "@/redux/store";

export const selectMedicineProductDetails = (state: RootState) =>
  state.medicineProductDetails.productDetails;

export const selectMedicineProductDetailsLoading = (state: RootState) =>
  state.medicineProductDetails.productDetailsLoading;

export const selectMedicineProductDetailsError = (state: RootState) =>
  state.medicineProductDetails.productDetailsError;

export const selectMedicineProductReviews = (state: RootState) =>
  state.medicineProductDetails.reviews;

export const selectMedicineProductReviewsLoading = (state: RootState) =>
  state.medicineProductDetails.reviewsLoading;

export const selectMedicineProductReviewsError = (state: RootState) =>
  state.medicineProductDetails.reviewsError;

export const selectMedicineProductReviewsPagination = (state: RootState) =>
  state.medicineProductDetails.reviewsPagination;

export const selectAddingToCart = (state: RootState) =>
  state.medicineProductDetails.addingToCart;

export const selectAddToCartError = (state: RootState) =>
  state.medicineProductDetails.addToCartError;

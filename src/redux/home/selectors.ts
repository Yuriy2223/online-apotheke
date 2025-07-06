import { RootState } from "../store";

export const selectHomeLoading = (state: RootState) => state.home.isLoading;

export const selectHomeError = (state: RootState) => state.home.error;

export const selectReviewsHome = (state: RootState) => state.home.reviews;

export const selectPharmacieNearest = (state: RootState) =>
  state.home.pharmacies;

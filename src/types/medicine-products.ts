import { PaginationData } from "./pagination";

export const sortCategory = [
  "Leg",
  "Head",
  "Hand",
  "Heart",
  "Health",
  "Medicine",
  "Skin Care",
  "Dental Care",
  "Supplements",
];
export interface MedicineProduct {
  _id: string;
  photo: string;
  name: string;
  suppliers: string;
  stock: number;
  price: number;
  category: string;
  createdAt?: string;
  updatedAt?: string;
}
export interface MedicinesResponse {
  products: MedicineProduct[];
  pagination: PaginationData;
}
export interface MedicinesParams {
  page?: number;
  limit?: number;
  search?: string;
  category?: string;
}
export interface MedicineProductDetails extends MedicineProduct {
  description: string;
  rating: number;
  reviewsCount: number;
  medicalUses?: {
    antioxidant?: string;
    antiDiabetic?: string;
    heartHealth?: string;
    antiCancer?: string;
    immuneSupport?: string;
    digestiveAid?: string;
  };
}
// export interface MedicineProductReviewsResponse {
//   reviews: MedicineProductDetailsReview[];
//   pagination: {
//     currentPage: number;
//     totalPages: number;
//     totalCount: number;
//     limit: number;
//   };
// }
// export interface MedicineProductDetailsReview {
//   _id: string;
//   productId: string;
//   userId: string;
//   rating: number;
//   comment: string;
//   commentDate: string;
//   description?: string;
//   createdAt: string;
//   updatedAt: string;
// }
export interface MedicineProductDetailsReview {
  _id: string;
  productId: string;
  userId: string;
  rating: number;
  comment: string;
  commentDate: string;
  description?: string;
  createdAt: string;
  updatedAt: string;
}

export interface MedicineProductDetailsReviewWithUser
  extends MedicineProductDetailsReview {
  userName: string;
  userAvatar: string | null;
}

export interface MedicineProductReviewsResponse {
  reviews: MedicineProductDetailsReviewWithUser[];
  pagination: {
    currentPage: number;
    totalPages: number;
    totalCount: number;
    limit: number;
  };
}

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
  originalPrice?: number;
  discountedPrice?: number;
  discount?: number;
  hasDiscount?: boolean;
  savings?: number;
}
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

export interface Promotion {
  _id: string;
  productId: string;
  discountPercent: number;
  isActive: boolean;
  promoType: "sale" | "flash" | "seasonal" | "clearance";
  createdAt?: string;
  updatedAt?: string;
}
export interface PromotionProduct extends MedicineProduct {
  promotion?: {
    discountPercent: number;
    promoType: string;
  };
  finalPrice?: number;
}
export interface PromotionResponse {
  products: PromotionProduct[];
  pagination: PaginationData;
}
export interface PromotionParams {
  page?: number;
  limit?: number;
  search?: string;
  discount?: string;
}

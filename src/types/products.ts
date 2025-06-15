export interface Product {
  _id: string;
  photo: string;
  name: string;
  suppliers: string;
  stock: string;
  price: string;
  category: string;
  createdAt: string;
  updatedAt: string;
}
export interface GetProductsQuery {
  search?: string;
  category?: string;
  minPrice?: string;
  maxPrice?: string;
  supplier?: string;
  page?: string;
  limit?: string;
  sortBy?: string;
  sortOrder?: string;
}
export interface CreateProductData {
  photo: string;
  name: string;
  suppliers: string;
  stock: string;
  price: string;
  category: string;
}
// export interface UpdateProductData extends Partial<CreateProductData> {}
export type UpdateProductData = Partial<CreateProductData>;
export interface ProductSearchParams {
  search?: string;
  category?: string;
  minPrice?: number;
  maxPrice?: number;
  supplier?: string;
  page?: number;
  limit?: number;
  sortBy?:
    | "name"
    | "price"
    | "category"
    | "suppliers"
    | "createdAt"
    | "updatedAt";
  sortOrder?: "asc" | "desc";
}
export interface PaginationInfo {
  currentPage: number;
  totalPages: number;
  totalCount: number;
  limit: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
}
export interface ProductFilters {
  search?: string;
  category?: string;
  supplier?: string;
  minPrice?: string;
  maxPrice?: string;
}
export interface GetProductsResponse {
  success: boolean;
  data: {
    products: Product[];
    pagination: PaginationInfo;
    filters: ProductFilters;
  };
}
export interface GetProductResponse {
  success: boolean;
  data: {
    product: Product;
  };
}
// export interface ApiError {
//   success: false;
//   error: string;
//   details?: string[];
// }

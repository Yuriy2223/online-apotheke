export interface PaginationData {
  currentPage: number;
  totalPages: number;
  totalCount: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
  limit: number;
}

export interface ApiResponse<T> extends PaginationData {
  data: T[];
}

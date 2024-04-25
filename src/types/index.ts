export type SortingOptions = {
  sortBy?: string;
  sortOrder?: "asc" | "desc";
};

export type PaginationOptions = {
  page?: number;
  limit?: number;
};

export type BackendQueryOptions = PaginationOptions &
  SortingOptions & { populateFields?: string[] };

export type APIError = {
  statusCode: number;
  message: string;
};

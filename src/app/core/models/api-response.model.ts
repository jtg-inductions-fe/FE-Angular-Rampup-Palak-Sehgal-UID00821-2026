/**
 * Generic API for success and standard responses.
 */
export interface ApiResponse<T = unknown> {
  success: boolean;
  message: string;
  data?: T;
  timestamp: string;
  error?: string | string[];
  code?: string;
}

/**
 * structure for failed API responses.
 */
export interface ApiErrorResponse {
  success: false;
  message: string;
  error: string | string[];
  code: string;
  timestamp: string;
}

/**
 * Envelope for paginated list responses.
 */
export interface PaginatedData<T> {
  data: T[];
  totalItems: number;
  totalPages: number;
  currentPage: number;
  pageSize: number;
}

/**
 * Allowed values for URL Query Parameters
 */
export type QueryParamValue = string | number | boolean | null | undefined;

/**
 * Common shape for Query Parameters object
 */
export type QueryParams = Record<string, QueryParamValue>;

import { ApiResponse, PaginatedData } from '@core/models/api-response.model';
import { SortByOption, SortOrderOption } from './article-constants';

/**
 * 1. Article Entity
 */
export interface Article {
  id: string;
  title: string;
  shortDescription: string;
  description: string;
  image: string;
  author: string;
  createdAt: string;
  updatedAt: string;
  tags: string[];
}

/**
 * 2. Create Article Request Payload
 */
export interface CreateArticleRequest {
  title: string;
  shortDescription: string;
  description: string;
  image: string;
  tags: string[];
}

/**
 * 3. Update Article Request Payload
 */
export interface UpdateArticleRequest {
  title?: string;
  shortDescription?: string;
  description?: string;
  image?: string;
}

/**
 * 4. Filtering, Sorting & Query Parameters
 */

// eslint-disable-next-line @typescript-eslint/consistent-type-definitions
export type ArticleQueryParams = {
  page?: number;
  pageSize?: number;
  search?: string;
  tags?: string;
  author?: string;
  sortBy?: SortByOption;
  sortOrder?: SortOrderOption;
};

/**
 * 5. Complete Article Response Types
 */
export type ArticleResponse = ApiResponse<Article>;
export type ArticleListResponse = ApiResponse<PaginatedData<Article>>;
export type MyArticlesResponse = ApiResponse<Article[]>;

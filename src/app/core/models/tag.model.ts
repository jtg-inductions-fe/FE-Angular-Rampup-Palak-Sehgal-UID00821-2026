import { ApiResponse } from './api-response.model';

/**
 * 1. Tag Entity
 */
export interface Tag {
  id: string;
  name: string;
  createdAt: string;
}

/**
 * 2. Create Tag Request Payload
 */
export interface CreateTagRequest {
  name: string;
}

/**
 * 3. Tag Response Types
 */
export type TagResponse = ApiResponse<Tag>;
export type TagListResponse = ApiResponse<Tag[]>;

import { ApiResponse } from './api-response.model';

/**
 * 1. User Entity
 * Main structure of user that is received from Database and Backend
 */
export interface User {
  id: string;
  username: string;
  email: string;
  createdAt: string;
  updatedAt: string;
}

/**
 * 2. Register Request Payload
 * User form to register user
 */
export interface RegisterRequest {
  username: string;
  email: string;
  password: string;
}

/**
 * 3. Login Request Payload
 * User form to login user
 */
export interface LoginRequest {
  username: string;
  password: string;
}

/**
 * 4. Auth Data (Login Response)
 * on successful login details received from backend
 */
export interface AuthData {
  user: User;
  token: string;
}

/**
 * 5. Complete Response Types
 */
export type AuthResponse = ApiResponse<AuthData>;
export type UserProfileResponse = ApiResponse<User>;

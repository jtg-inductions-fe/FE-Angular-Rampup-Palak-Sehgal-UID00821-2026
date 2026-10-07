import { Injectable } from '@angular/core';
import { BaseApiService } from './base-api.service';
import { AuthResponse, LoginRequest } from '../models';

@Injectable({
  providedIn: 'root',
})
export class AuthService extends BaseApiService {
  login(credentials: LoginRequest) {
    return this.post<AuthResponse>('users/login', credentials);
  }
}

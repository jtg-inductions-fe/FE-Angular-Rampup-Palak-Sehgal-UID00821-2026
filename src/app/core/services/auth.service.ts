import { computed, inject, Injectable, signal } from '@angular/core';
import { BaseApiService } from './base-api.service';
import { AuthResponse, LoginRequest, User, UserProfileResponse } from '../models';
import { TokenStorageService } from './token-storage.service';
import { tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService extends BaseApiService {
  private tokenStorage = inject(TokenStorageService);

  public tokenSignal = signal<string | null>(this.tokenStorage.getToken());
  private currentUserSignal = signal<User | null>(null);

  readonly currentUser = this.currentUserSignal.asReadonly();
  readonly isLoggedIn = computed(() => !!this.tokenSignal() && !!this.currentUserSignal());

  login(credentials: LoginRequest) {
    return this.post<AuthResponse>('users/login', credentials).pipe(
      tap(response => {
        if (response.data) {
          this.tokenStorage.saveToken(response.data.token);
          this.tokenSignal.set(response.data.token);
          this.currentUserSignal.set(response.data.user);
        }
      })
    );
  }

  logout(): void {
    this.tokenStorage.clearToken();
    this.tokenSignal.set(null);
    this.currentUserSignal.set(null);
  }

  getProfile() {
    return this.get<UserProfileResponse>('users/profile').pipe(
      tap(response => {
        if (response.data) {
          this.currentUserSignal.set(response.data);
        }
      })
    );
  }
}

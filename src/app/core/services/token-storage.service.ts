import { inject, Injectable } from '@angular/core';
import { NotificationService } from './notification.service';

const TOKEN_KEY = 'auth-token';

@Injectable({
  providedIn: 'root',
})
export class TokenStorageService {
  private notificationService = inject(NotificationService);
  public saveToken(token: string): void {
    try {
      window.localStorage.removeItem(TOKEN_KEY);
      window.localStorage.setItem(TOKEN_KEY, token);
    } catch (error) {
      this.notificationService.showError(`Storage blocked: Cannot save token: ${error}`);
    }
  }

  public getToken(): string | null {
    try {
      return window.localStorage.getItem(TOKEN_KEY);
    } catch (error) {
      console.warn(error);
      return null;
    }
  }

  public clearToken(): void {
    try {
      window.localStorage.removeItem(TOKEN_KEY);
    } catch (error) {
      this.notificationService.showError(`Storage blocked: Cannot clear token: ${error}`);
    }
  }

  public isLoggedIn(): boolean {
    return !!this.getToken();
  }
}

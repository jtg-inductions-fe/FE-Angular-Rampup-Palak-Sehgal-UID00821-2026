import { inject, Injectable } from '@angular/core';
import { DOCUMENT } from '@angular/common';

import { NotificationService } from '@shared/services/notification.service';

const TOKEN_KEY = 'auth-token';

@Injectable({
  providedIn: 'root',
})
export class TokenStorageService {
  private notificationService = inject(NotificationService);
  private document = inject(DOCUMENT);
  private localStorage = this.document.defaultView?.localStorage;

  public saveToken(token: string): void {
    try {
      this.localStorage?.setItem(TOKEN_KEY, token);
    } catch (error) {
      this.notificationService.showNotification(`Storage blocked: Cannot save token: ${error}`);
    }
  }

  public getToken(): string | null {
    try {
      return this.localStorage?.getItem(TOKEN_KEY) ?? null;
    } catch (error) {
      console.warn(error);
      return null;
    }
  }

  public clearToken(): void {
    try {
      this.localStorage?.removeItem(TOKEN_KEY);
    } catch (error) {
      this.notificationService.showNotification(`Storage blocked: Cannot clear token: ${error}`);
    }
  }

  public isLoggedIn(): boolean {
    return !!this.getToken();
  }
}

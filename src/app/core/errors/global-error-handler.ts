import { ErrorHandler, inject, Injectable, NgZone } from '@angular/core';
import { NotificationService } from '../services/notification.service';
import { ERROR_MESSAGES } from '../../shared/constants/error-messages.constant';

@Injectable()
export class GlobalErrorHandler implements ErrorHandler {
  private zone = inject(NgZone);
  private notificationService = inject(NotificationService);

  handleError(error: unknown): void {
    let errorMessage = ERROR_MESSAGES.UNEXPECTED;
    if (error instanceof Error) {
      errorMessage = error.message;
    } else if (typeof error === 'string') {
      errorMessage = error;
    }

    return this.zone.run(() => {
      this.notificationService.showError(`App Error: ${errorMessage}`);
    });
  }
}

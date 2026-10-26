import { ErrorHandler, inject, Injectable } from '@angular/core';

import { NotificationService } from '@shared/services/notification.service';
import { ERROR_MESSAGES } from '@shared/constants/error-messages.constants';
import { isHttpError } from '@src/app/core/utils/error.utils';

@Injectable()
export class GlobalErrorHandler implements ErrorHandler {
  private notificationService = inject(NotificationService);

  handleError(error: unknown): void {
    if (isHttpError(error)) return;

    const errorMessage = error instanceof Error ? error.message : typeof error === 'string' ? error : ERROR_MESSAGES.UNEXPECTED;

    this.notificationService.showNotification(`App Error: ${errorMessage}`);
  }
}

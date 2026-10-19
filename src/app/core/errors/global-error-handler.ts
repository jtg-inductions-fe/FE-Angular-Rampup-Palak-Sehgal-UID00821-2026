import { ErrorHandler, inject, Injectable, NgZone } from '@angular/core';

import { NotificationService } from '@core/services/notification.service';
import { ERROR_MESSAGES } from '@shared/constants/error-messages.constants';
import { isHttpError } from '@src/app/core/utils/error.utils';

@Injectable()
export class GlobalErrorHandler implements ErrorHandler {
  private zone = inject(NgZone);
  private notificationService = inject(NotificationService);

  handleError(error: unknown): void {
    if (isHttpError(error)) return;

    const errorMessage =
      error instanceof Error
        ? error.message
        : typeof error === 'string'
          ? error
          : ERROR_MESSAGES.UNEXPECTED;

    this.zone.run(() => {
      this.notificationService.showError(`App Error: ${errorMessage}`);
    });
  }
}

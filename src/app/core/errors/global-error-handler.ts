import { HttpErrorResponse } from '@angular/common/http';
import { ErrorHandler, inject, Injectable, NgZone } from '@angular/core';
import { NotificationService } from '../services/notification.service';
import { ERROR_MESSAGES } from '../../shared/constants/error-messages.constants';

function isHttpError(error: unknown): boolean {
  if (!error || typeof error !== 'object') {
    return false;
  }
  if (error instanceof HttpErrorResponse) {
    return true;
  }
  const err = error as Record<string, unknown>;
  if ('status' in err && 'headers' in err) {
    return true;
  }
  if (err['name'] === 'HttpErrorResponse') {
    return true;
  }
  if ('rejection' in err && isHttpError(err['rejection'])) {
    return true;
  }
  if ('cause' in err && isHttpError(err['cause'])) {
    return true;
  }
  return false;
}

@Injectable()
export class GlobalErrorHandler implements ErrorHandler {
  private zone = inject(NgZone);
  private notificationService = inject(NotificationService);

  handleError(error: unknown): void {
    if (isHttpError(error)) {
      return;
    }

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

import { HttpErrorResponse } from '@angular/common/http';
import { ErrorHandler, inject, Injectable, NgZone } from '@angular/core';
import { NotificationService } from '../services/notification.service';
import { ERROR_MESSAGES } from '../../shared/constants/error-messages.constants';

function isHttpError(error: unknown): boolean {
  if (!error || typeof error !== 'object') return false;

  if (error instanceof HttpErrorResponse) return true;

  const err = error as Record<string, unknown>;

  if (err['name'] === 'HttpErrorResponse' || ('status' in err && 'headers' in err)) {
    return true;
  }

  return (
    ('rejection' in err && isHttpError(err['rejection'])) ||
    ('cause' in err && isHttpError(err['cause'])) ||
    false
  );
}

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

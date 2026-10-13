import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, EMPTY, throwError } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { ERROR_MESSAGES } from '../../shared/constants/error-messages.constants';
import { HttpStatus } from '../../shared/constants/http-status.enum';
import { NotificationService } from '../services/notification.service';

function parseErrorItem(item: unknown): string | null {
  if (!item) {
    return null;
  }

  if (typeof item === 'string') {
    return item;
  }

  if (Array.isArray(item)) {
    const msgs = item
      .map(subItem => parseErrorItem(subItem))
      .filter((m): m is string => Boolean(m));
    return msgs.length ? msgs.join(', ') : null;
  }

  if (typeof item === 'object') {
    const obj = item as Record<string, unknown>;

    if (typeof obj['msg'] === 'string') {
      return obj['msg'];
    }
    if (typeof obj['message'] === 'string' && obj['message'] !== 'Validation failed') {
      return obj['message'];
    }

    const values = Object.values(obj)
      .map(v => parseErrorItem(v))
      .filter((m): m is string => Boolean(m));

    return values.length ? values.join(', ') : null;
  }

  return null;
}

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);
  const notificationService = inject(NotificationService);

  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      if (error.status === HttpStatus.unauthorized || error.status === HttpStatus.forbidden) {
        notificationService.showWarning(ERROR_MESSAGES.UNAUTHORIZED);
        authService.logout();
        return EMPTY;
      }
      let errorMessage: string = ERROR_MESSAGES.UNEXPECTED;

      if (error.error instanceof ErrorEvent) {
        errorMessage = `${ERROR_MESSAGES.NETWORK_ERROR}: ${error.error.message}`;
      } else if (error.error) {
        const apiError = error.error;
        if (typeof apiError === 'string') {
          errorMessage = apiError;
        } else if (typeof apiError === 'object' && apiError !== null) {
          const obj = apiError as Record<string, unknown>;
          const parsed =
            parseErrorItem(obj['error']) ||
            parseErrorItem(obj['errors']) ||
            (typeof obj['message'] === 'string' && obj['message'] ? obj['message'] : null);

          if (parsed) {
            errorMessage = parsed;
          }
        }
      } else if (error.status === 0) {
        errorMessage = ERROR_MESSAGES.NETWORK_ERROR;
      } else if (error.status >= 500) {
        errorMessage = ERROR_MESSAGES.SERVER_ERROR;
      } else if (error.message) {
        errorMessage = error.message;
      }

      if (error.status !== HttpStatus.unauthorized && error.status !== HttpStatus.forbidden) {
        notificationService.showError(errorMessage);
      }
      return throwError(() => error);
    })
  );
};

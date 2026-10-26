import { inject } from '@angular/core';
import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';

import { catchError, throwError } from 'rxjs';

import { AuthService } from '@core/services/auth.service';
import { ERROR_MESSAGES, HttpStatus, HTTP_ERROR_MAP } from '@shared/constants/error-messages.constants';
import { NotificationService } from '@shared/services/notification.service';
import { extractMessage } from '@core/utils/error.utils';

const authEndPoints = ['users/login', 'users/register'];

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);
  const notificationService = inject(NotificationService);

  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      const isAuthEndpoint = authEndPoints.some(endpoint => req.url.includes(endpoint));

      if (!isAuthEndpoint && error.status === HttpStatus.unauthorized) {
        notificationService.showNotification(HTTP_ERROR_MAP[error.status]);
        authService.logout();
        return throwError(() => error);
      }

      if (error.status === HttpStatus.forbidden) {
        notificationService.showNotification(HTTP_ERROR_MAP[error.status]);
        return throwError(() => error);
      }

      const errorMessage =
        error.error instanceof ErrorEvent
          ? `${ERROR_MESSAGES.NETWORK_ERROR}: ${error.error.message}`
          : error.status >= 500
            ? ERROR_MESSAGES.SERVER_ERROR
            : HTTP_ERROR_MAP[error.status] || extractMessage(error.error) || error.message || ERROR_MESSAGES.UNEXPECTED;

      notificationService.showNotification(errorMessage);
      return throwError(() => error);
    })
  );
};

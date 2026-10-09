import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, EMPTY, throwError } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { ERROR_MESSAGES } from '../../shared/constants/error-messages.constant';
import { HttpStatus } from '../../shared/constants/http-status.enum';
import { NotificationService } from '../services/notification.service';

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
      let errorMessage = ERROR_MESSAGES.UNEXPECTED;
      console.warn(errorMessage);
      if (error.error instanceof ErrorEvent) {
        errorMessage = `${ERROR_MESSAGES.NETWORK_ERROR}: ${error.error.message}`;
      } else {
        errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
      }
      if (error.status !== HttpStatus.unauthorized && error.status !== HttpStatus.forbidden) {
        notificationService.showError(errorMessage);
      }
      return throwError(() => error);
    })
  );
};

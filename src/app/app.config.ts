import { ApplicationConfig, ErrorHandler, inject, provideAppInitializer, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { provideHttpClient, withInterceptors } from '@angular/common/http';

import { catchError, firstValueFrom, of } from 'rxjs';

import { routes } from './app.routes';
import { AuthService } from './core/services/auth.service';
import { authInterceptor } from './core/interceptors/auth.interceptor';
import { errorInterceptor } from './core/interceptors/error.interceptor';
import { GlobalErrorHandler } from './core/errors/global-error-handler';

export const appConfig: ApplicationConfig = {
  providers: [
    //hands over browser errors to global error handler
    provideBrowserGlobalErrorListeners(),
    //withComponentInputBinding: send query params in comp params directly
    provideRouter(routes, withComponentInputBinding()),
    provideHttpClient(withInterceptors([authInterceptor, errorInterceptor])),
    provideAppInitializer(() => {
      const authService = inject(AuthService);
      //firstValueFrom: converts observable to promise becoz initializer waits for the promise to resolve
      if (authService.tokenSignal()) {
        return firstValueFrom(authService.getProfile().pipe(catchError(() => of(null))));
      }
      return Promise.resolve();
    }),
    {
      provide: ErrorHandler,
      useClass: GlobalErrorHandler,
    },
  ],
};

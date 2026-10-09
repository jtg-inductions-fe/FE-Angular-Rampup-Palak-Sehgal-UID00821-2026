import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { inject } from '@angular/core';

export const articleOwnerGuard: CanActivateFn = () => {
  const authService = inject(AuthService);
  const router = inject(Router);

  const currentUser = authService.currentUser();
  // const id = route.paramMap.get('id');
  //TODO: check with id of user if the author is creating the article after the article page is done
  if (!currentUser) {
    return router.createUrlTree(['/auth']);
  }
  return true;
};

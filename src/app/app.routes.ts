import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'auth',
    pathMatch: 'full',
  },
  {
    path: 'auth',
    loadChildren: () => import('./modules/auth/auth.module').then(m => m.AuthModule),
  },
  {
    path: 'dashboard',
    loadChildren: () => import('./modules/dashboard/dashboard.route').then(m => m.DASHBOARD_ROUTES),
  },
  {
    path: '**',
    // 404 page ko bhi lazy-load karenge taaki main bundle me unnecessary load na ho
    loadComponent: () =>
      import('./shared/components/not-found/not-found.component').then(m => m.NotFoundComponent),
  },
];

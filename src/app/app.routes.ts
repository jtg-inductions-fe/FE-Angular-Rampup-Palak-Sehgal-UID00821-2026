import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth-guard';
import { guestGuard } from './core/guards/guest-guard';
import { articleResolver } from './core/resolvers/article.resolver';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'auth',
    pathMatch: 'full',
  },
  {
    path: 'auth',
    canActivate: [guestGuard],
    loadChildren: () => import('./modules/auth/auth.module').then(m => m.AuthModule),
  },
  {
    path: 'dashboard',
    canActivate: [authGuard],
    loadChildren: () => import('./modules/dashboard/dashboard.route').then(m => m.DASHBOARD_ROUTES),
  },
  {
    path: 'articles/:id',
    canActivate: [authGuard],
    resolve: {
      articleData: articleResolver,
    },
    loadComponent: () =>
      import('./modules/articles/article-detail/article-detail.component').then(
        m => m.ArticleDetailComponent
      ),
  },
  {
    path: '**',
    loadComponent: () =>
      import('./shared/components/not-found/not-found.component').then(m => m.NotFoundComponent),
  },
];

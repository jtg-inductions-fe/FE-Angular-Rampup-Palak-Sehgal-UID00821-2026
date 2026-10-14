import { inject } from '@angular/core';
import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth-guard';
import { guestGuard } from './core/guards/guest-guard';
import { articleResolver } from './core/resolvers/article.resolver';
import { AuthService } from './core/services/auth.service';

export const routes: Routes = [
  {
    path: '',
    redirectTo: () => (inject(AuthService).isLoggedIn() ? 'dashboard' : 'auth'),
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
    loadChildren: () => import('./modules/dashboard/dashboard-module').then(m => m.DashboardModule),
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

import { Routes } from '@angular/router';
import { isAuthenticatedGuard } from './guards/isAuthenticated.guard';
import { isNotAuthenticatedGuard } from './guards/isNotAuthenticated.guard';

export const routes: Routes = [
  {
    path: 'main',
    canActivate: [isAuthenticatedGuard],
    loadChildren: () =>
      import('./pages/tabs/tabs.routes').then((m) => m.routes),
  },
  {
    path: 'login',
    canActivate: [isNotAuthenticatedGuard],
    loadComponent: () =>
      import('./pages/login/login.page').then((m) => m.LoginPage),
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'login',
  },
];

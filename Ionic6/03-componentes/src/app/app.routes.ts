import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'inicio',
    pathMatch: 'full',
  },
  {
    path: 'inicio',
    loadComponent: () =>
      import('./pages/inicio/inicio.page').then((m) => m.InicioPage),
  },

  {
    path: 'alert',
    loadComponent: () =>
      import('./pages/alert/alert.page').then((m) => m.AlertPage),
  },
  {
    path: 'action-sheet',
    loadComponent: () =>
      import('./pages/action-sheet/action-sheet.page').then(
        (m) => m.ActionSheetPage
      ),
  },
  {
    path: 'avatar',
    loadComponent: () =>
      import('./pages/avatar/avatar.page').then((m) => m.AvatarPage),
  },
  {
    path: 'button',
    loadComponent: () =>
      import('./pages/button/button.page').then((m) => m.ButtonPage),
  },
];

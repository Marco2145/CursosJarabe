import { Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

export const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'tab1',
        loadComponent: () =>
          import('../tab1/tab1.page').then((m) => m.Tab1Page),
      },
      {
        path: 'tab2',
        children: [
          {
            path: '',
            loadComponent: () =>
              import('../tab2/tab2.page').then((m) => m.Tab2Page),
          },
          {
            path: 'map/:geo',
            loadComponent: () =>
              import('../view-map/view-map.page').then((m) => m.ViewMapPage),
          },
        ],
      },

      {
        path: '',
        redirectTo: '/tabs/tab1',
        pathMatch: 'full',
      },
    ],
  },
  {
    path: '',
    redirectTo: '/tabs/tab1',
    pathMatch: 'full',
  },
];

import { Routes } from '@angular/router';
import { FullscreenMapPageComponent } from './pages/fullscreen-map-page/fullscreen-map-page.component';
import { MarkersPageComponent } from './pages/markers-page/markers-page.component';
import { HousesPageComponent } from './pages/houses-page/houses-page.component';

export const routes: Routes = [
  {
    path: 'fullscreen',
    title: 'FullScreen Map',
    component: FullscreenMapPageComponent,
  },
  {
    path: 'markers',
    title: 'Marcadores',
    component: MarkersPageComponent,
  },
  {
    path: 'houses',
    title: 'Propiedades disponibles',
    component: HousesPageComponent,
  },
  {
    path: '**',
    redirectTo: 'fullscreen',
  },
];

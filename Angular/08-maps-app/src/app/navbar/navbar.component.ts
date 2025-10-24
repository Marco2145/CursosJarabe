import { Component, inject } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { NavigationEnd, Router, RouterLink } from '@angular/router';
import { filter, map, tap } from 'rxjs';
import { toSignal } from '@angular/core/rxjs-interop';

import { routes } from '../app.routes';

@Component({
  selector: 'app-navbar',
  imports: [AsyncPipe, RouterLink],
  templateUrl: './navbar.component.html',
})
export class NavbarComponent {
  // Objeto en el que se encuentra toda la info de la ruta
  router = inject(Router);

  // De ese objeto, sacamos las rutas posibles
  routes = routes
    .map((route) => ({
      path: route.path,
      title: `${route.title ?? 'Maps en Angular'}`,
    }))
    .filter((route) => route.path != '**');

  // Y para determinar el título de la pagina, checamos el evento de navegación, le sacamos la url, y
  // revisamos la url contra las que tenemos en routes para sacar el título correcto

  // Versión con observable (Tiene un $ al final del nombre por convención)
  pageTitle$ = this.router.events.pipe(
    filter((event) => event instanceof NavigationEnd),
    map((navigationEnd) => navigationEnd.urlAfterRedirects),
    map((url) => routes.find((route) => `/${route.path}` === url)?.title)
  );

  // Versión con señal
  pageTitle = toSignal(
    this.router.events.pipe(
      filter((event) => event instanceof NavigationEnd),
      map((navigationEnd) => navigationEnd.urlAfterRedirects),
      map((url) => routes.find((route) => `/${route.path}` === url)?.title)
    )
  );
}

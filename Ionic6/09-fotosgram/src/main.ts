import { bootstrapApplication } from '@angular/platform-browser';
import {
  RouteReuseStrategy,
  provideRouter,
  withPreloading,
  PreloadAllModules,
} from '@angular/router';
import {
  IonicRouteStrategy,
  provideIonicAngular,
} from '@ionic/angular/standalone';

import { routes } from './app/app.routes';
import { AppComponent } from './app/app.component';
import { provideHttpClient, withFetch } from '@angular/common/http';
import {
  importProvidersFrom,
  inject,
  provideAppInitializer,
} from '@angular/core';
import { IonicStorageModule } from '@ionic/storage-angular';
import { UserService } from './app/services/user.service';

// Some Capacitor plugins, such as Camera or Toast, have web-based UI available when not running natively.
import { defineCustomElements } from '@ionic/pwa-elements/loader';

// Call the element loader before the bootstrapModule/bootstrapApplication call
defineCustomElements(window);

bootstrapApplication(AppComponent, {
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    provideIonicAngular(),
    provideRouter(routes, withPreloading(PreloadAllModules)),
    // Inicialización para que el storage esté disponible nadamás empezar
    provideAppInitializer(() => {
      const userService = inject(UserService);
      return userService.init();
    }),
    provideHttpClient(withFetch()),
    importProvidersFrom(IonicStorageModule.forRoot()),
  ],
});

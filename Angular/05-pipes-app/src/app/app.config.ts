import {
  ApplicationConfig,
  LOCALE_ID,
  provideBrowserGlobalErrorListeners,
  provideZoneChangeDetection,
} from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { registerLocaleData } from '@angular/common';

// Para que angular sepa qué significa el "es" en locale
import localEs from '@angular/common/locales/es-MX';
import localJa from '@angular/common/locales/ja';
import { LocaleService } from './services/locale.service';
registerLocaleData(localEs, 'es');
registerLocaleData(localJa, 'ja');

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    {
      // Para cambiar el locale ID
      provide: LOCALE_ID,
      // useValue: 'es',
      deps: [LocaleService],
      useFactory: (localeService: LocaleService) => localeService.getLocale,
    },
  ],
};

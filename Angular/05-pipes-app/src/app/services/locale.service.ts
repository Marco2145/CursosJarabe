import { Injectable, signal } from '@angular/core';

export type availableLocale = 'es' | 'ja' | 'en';

@Injectable({ providedIn: 'root' })
export class LocaleService {
  private currentLocale = signal<availableLocale>('es');

  constructor() {
    // Esto es incorrecto -> se debe verificar la info antes de usarla
    this.currentLocale.set((localStorage.getItem('locale') as availableLocale) ?? 'es');
  }

  get getLocale() {
    return this.currentLocale();
  }

  changeLocal(locale: availableLocale) {
    localStorage.setItem('locale', locale);
    this.currentLocale.set(locale);
    window.location.reload();
  }
}

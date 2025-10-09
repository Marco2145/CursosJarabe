import { Component, signal } from '@angular/core';
import { toggleCasePipe } from '../../pipes/toggle-case.pipe';
import { heroes } from '../../data/heroes.data';
import { canFlyPipe } from '../../pipes/can-fly.pipe';
import { heroColorPipe } from '../../pipes/hero-color.pipe';
import { HeroTextoColorPipe } from '../../pipes/hero-text-color.pipe';
import { TitleCasePipe } from '@angular/common';
import { HeroCreatorPipe } from '../../pipes/hero-creator.pipe';

@Component({
  selector: 'app-custom-page',
  imports: [
    toggleCasePipe,
    canFlyPipe,
    heroColorPipe,
    HeroTextoColorPipe,
    TitleCasePipe,
    HeroCreatorPipe,
  ],
  templateUrl: './custom-page.component.html',
})
export default class CustomPageComponent {
  name = signal('Harmony No Surname');

  isUpperCase = signal<boolean>(true);
  toggleSignal() {
    this.isUpperCase.update((value) => !value);
  }

  heroes = signal(heroes);
}

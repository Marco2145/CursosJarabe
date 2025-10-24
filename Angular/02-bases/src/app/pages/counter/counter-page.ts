import { ChangeDetectionStrategy, Component, signal } from '@angular/core';

@Component({
  templateUrl: './counter-page.html',
  styles: `
    button{
      padding: 5px;
      margin: 5px 10px;
      width: 75px;
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CounterPage {
  counter = 10;
  counterSignal = signal(10);

  constructor() {
    console.log('Esyoy');
  }

  increaseBy(value: number) {
    this.counter += value;
    this.counterSignal.update((current) => current + value);
  }

  resetCounter() {
    this.counter = 10;
    this.counterSignal.set(10);
  }
}

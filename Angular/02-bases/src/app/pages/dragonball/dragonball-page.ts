import { NgClass } from '@angular/common';
import { Component, computed, signal } from '@angular/core';

interface Character {
  id: number;
  name: string;
  power: number;
}

@Component({
  imports: [],
  templateUrl: './dragonball-page.html',
})
export class DragonballPage {
  name = signal('');
  power = signal(0);

  characters = signal<Character[]>([
    { id: 1, name: 'Goku', power: 9001 },
    // { id: 2, name: 'Vegeta777', power: 8000 },
    // { id: 3, name: 'Pedro', power: 3000 },
    // { id: 4, name: 'Yamcha', power: 500 },
  ]);

  addCharacter() {
    if (!this.power() || !this.name() || this.power() < 0) {
      return;
    } else {
      const newCharacter: Character = {
        id: this.characters.length + 1,
        name: this.name(),
        power: this.power(),
      };
      console.log(newCharacter);
      this.characters.update((list) => [...list, newCharacter]);

      // console.log(`Added: ${this.name()} with power ${this.power()}`);
    }
  }
  // powerClasses = computed(() => {
  //   return {
  //     'text-danger': true,
  //   };
  // });
}

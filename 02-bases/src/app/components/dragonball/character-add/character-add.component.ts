import { Component, output, signal } from '@angular/core';
import { Character } from '../../../interfaces/character.interface';

@Component({
  selector: 'dragonball-character-add',
  imports: [],
  templateUrl: './character-add.component.html',
})
export class CharacterAddComponent {
  name = signal('');
  power = signal(0);

  newCharacter = output<Character>();

  addCharacter() {
    if (!this.power() || !this.name() || this.power() < 0) {
      return;
    } else {
      const newCharacter: Character = {
        id: Math.floor(Math.random() * 1000),
        name: this.name(),
        power: this.power(),
      };
      console.log(newCharacter);
      this.newCharacter.emit(newCharacter);
    }
  }
}

import { Component, inject } from '@angular/core';
import { CharacterListComponent } from '../../components/dragonball/character-list/character-list.component';
import { CharacterAddComponent } from '../../components/dragonball/character-add/character-add.component';
import { dragonballService } from '../../services/dragonball.service';
import { Character } from '../../interfaces/character.interface';

@Component({
  imports: [CharacterListComponent, CharacterAddComponent],
  templateUrl: './dragonball-super-page.html',
  selector: 'dragonball-super',
})
export class DragonballSuperPage {
  // Forma tradicional:
  // constructor(public dragonballService: dragonballService) {}
  // Forma recomendada:
  public dragonballService = inject(dragonballService);
}

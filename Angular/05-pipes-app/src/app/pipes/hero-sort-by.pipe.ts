import { Pipe, PipeTransform } from '@angular/core';
import { Creator, Hero } from '../interfaces/hero.interface';

@Pipe({
  name: 'heroSortBy',
})
export class HeroSortByPipe implements PipeTransform {
  transform(value: Hero[], sortBy: keyof Hero | null): Hero[] {
    // Copia para evitar que las transformaciones se realicen sobre el arreglo original
    const sortedHeroes = [...value];

    if (!sortBy) return sortedHeroes;

    switch (sortBy) {
      case 'name':
        return sortedHeroes.sort((a, b) => a.name.localeCompare(b.name));
      case 'canFly':
        return sortedHeroes.sort((a, b) => (a.canFly ? 1 : -1) - (b.canFly ? 1 : -1));
      case 'color':
        return sortedHeroes.sort((a, b) => a.color - b.color);
      case 'creator':
        return sortedHeroes.sort((a, b) => Creator[a.creator].localeCompare(Creator[b.creator]));

      default:
        return sortedHeroes;
    }
  }
}

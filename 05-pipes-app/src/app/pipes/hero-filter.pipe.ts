import { Pipe, PipeTransform } from '@angular/core';
import { Hero } from '../interfaces/hero.interface';

@Pipe({
  name: 'heroFilter',
})
export class HeroFilterPipe implements PipeTransform {
  transform(value: Hero[], searchQuery: string): Hero[] {
    // Copia del arreglo para no hacer operaciones sobre el original
    const filteredHeroes = [...value];

    if (!searchQuery) return filteredHeroes;
    searchQuery = searchQuery.toLowerCase();

    return filteredHeroes.filter((hero) => hero.name.toLowerCase().includes(searchQuery));
  }
}

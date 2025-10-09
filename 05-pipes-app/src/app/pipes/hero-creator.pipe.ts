import { Pipe, PipeTransform } from '@angular/core';
import { Creator } from '../interfaces/hero.interface';

@Pipe({
  name: 'heroCreator',
})
export class HeroCreatorPipe implements PipeTransform {
  transform(value: Creator): string {
    if (value < 0 || value > 1) return 'unknown creator';
    return Creator[value];
  }
}

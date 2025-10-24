import { Pipe, PipeTransform } from '@angular/core';
import { Color, ColorMap } from '../interfaces/hero.interface';

@Pipe({
  name: 'heroTextColor',
})
export class HeroTextoColorPipe implements PipeTransform {
  transform(value: Color): string {
    if (value < 0 || value > 3) return 'unknown color';
    return ColorMap[value];
  }
}

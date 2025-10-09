import { Pipe, PipeTransform, signal } from '@angular/core';
import { Color, ColorMap } from '../interfaces/hero.interface';

@Pipe({
  name: 'heroColor',
})
export class heroColorPipe implements PipeTransform {
  //   colorMap = ColorMap;
  //   color = Color;

  transform(value: Color): string {
    if (value < 0 || value > 3) return 'unknown color';
    return Color[value];
  }
}

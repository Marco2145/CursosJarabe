import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'canFly',
})
export class canFlyPipe implements PipeTransform {
  transform(value: boolean, ...args: any[]): string {
    if (value) return 'Puede volar';
    return 'No puede volar';
  }
}

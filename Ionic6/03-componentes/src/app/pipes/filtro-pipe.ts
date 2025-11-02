import { Pipe, type PipeTransform } from '@angular/core';

@Pipe({
  name: 'appFiltro',
})
export class FiltroPipe implements PipeTransform {
  transform(
    value: any[],
    filterTerm: string = '',
    column: string = 'title'
  ): any[] {
    if (!value) return [];

    if (filterTerm == '') return value;

    filterTerm = filterTerm.toLowerCase();

    try {
      // console.log(value);

      return value.filter((item) =>
        item[column].toLowerCase().includes(filterTerm)
      );
    } catch (error) {
      console.error(error);

      return value;
    }
  }
}

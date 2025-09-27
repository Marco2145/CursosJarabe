import { Component, input, inputBinding, output } from '@angular/core';

@Component({
  selector: 'country-search-input',
  imports: [],
  templateUrl: './country-search-input.component.html',
})
export class CountrySearchInputComponent {
  placeholder = input<string>('Buscar');

  value = output<string>();
}

import { Component, effect, input, inputBinding, output, signal } from '@angular/core';

@Component({
  selector: 'country-search-input',
  imports: [],
  templateUrl: './country-search-input.component.html',
})
export class CountrySearchInputComponent {
  placeholder = input<string>('Buscar');
  value = output<string>();

  inputValue = signal<string>('');

  debounceEffect = effect((onCleaup) => {
    // Muy importante este paso -> la señal indica a angular que requiere lanzar el efecto
    const value = this.inputValue();

    const myTimeout = setTimeout(() => {
      this.value.emit(value);
    }, 500);

    onCleaup(() => {
      clearTimeout(myTimeout);
    });
  });
}

import {
  Component,
  effect,
  input,
  inputBinding,
  linkedSignal,
  output,
  signal,
} from '@angular/core';

@Component({
  selector: 'country-search-input',
  imports: [],
  templateUrl: './country-search-input.component.html',
})
export class CountrySearchInputComponent {
  placeholder = input<string>('Buscar');
  value = output<string>();
  initialValue = input('');

  // inputValue = signal<string>(this.initialValue()); // No funciona
  inputValue = linkedSignal<string>(() => this.initialValue());

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

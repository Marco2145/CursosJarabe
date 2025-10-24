import { JsonPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { FormUtils } from '../../../utils/form-utils';

@Component({
  selector: 'app-dynamic-page',
  imports: [JsonPipe, ReactiveFormsModule],
  templateUrl: './dynamic-page.component.html',
})
export class DynamicPageComponent {
  private fb = inject(FormBuilder);
  formUtils = FormUtils;

  myForm: FormGroup = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(3)]],
    favoriteGames: this.fb.array(
      [
        ['Tetris', Validators.required],
        ['Puyo Puyo', Validators.required],
      ],
      Validators.minLength(3)
    ),
  });

  // Elemento aislado
  // Cuando es solo uno, recomienda con el new FormControl, queda mas 'legible'
  newFavorite = new FormControl('', Validators.required);
  // newFavorite = this.fb.control(['', Validations])

  get favoriteGames() {
    return this.myForm.get('favoriteGames') as FormArray;
  }

  onAddToFavorites() {
    // Checar si es valido
    if (this.newFavorite.invalid) return;

    const newGame = this.newFavorite.value;
    // Esta línea podría hacerse tambien con el new FormControl, nomás que se muestra ambas formas
    this.favoriteGames.push(this.fb.control(newGame, Validators.required));

    this.newFavorite.reset();
  }

  onDeleteFavorite(index: number) {
    this.favoriteGames.removeAt(index);
  }

  onSubmit() {
    this.myForm.markAllAsTouched();
  }
}

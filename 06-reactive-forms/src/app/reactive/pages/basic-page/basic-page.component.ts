import { JsonPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { FormUtils } from '../../../utils/form-utils';

@Component({
  selector: 'app-basic-page',
  imports: [JsonPipe, ReactiveFormsModule],
  templateUrl: './basic-page.component.html',
})
export class BasicPageComponent {
  // ? Esta es una forma de hacer forms reactivos pero no es recomendable por su complejidad
  // myForm = new FormGroup({
  //   //property: new FormContro(linitialValue, sync validators, async validators)
  //   name: new FormControl(''),
  //   price: new FormControl(0),
  //   inStorage: new FormControl(0),
  // });

  // Form builder es un servicio proveído en reactive forms module
  private fb = inject(FormBuilder);

  myForm: FormGroup = this.fb.group({
    // property: [initialValue, sync validators, async validators]
    name: ['', [Validators.required, Validators.minLength(3)]],
    price: [0, [Validators.required, Validators.min(10)]],
    inStorage: [0, [Validators.required, Validators.min(0)]],
  });

  // Las funciones de utilidad las mandamos a una clase de utilidades
  // isValidField
  // getFieldError
  formUtils = FormUtils;

  onSubmit() {
    if (this.myForm.invalid) {
      this.myForm.markAllAsTouched();
    } else {
      console.log(this.myForm.value);

      this.myForm.reset({
        price: 0,
        inStorage: 0,
      });
    }
  }
}

import { JsonPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import {
  FormBuilder,
  ReactiveFormsModule,
  Validators,
  FormGroup,
  AbstractControl,
} from '@angular/forms';
import { FormUtils } from '../../../utils/form-utils';

@Component({
  selector: 'app-register-page',
  imports: [JsonPipe, ReactiveFormsModule],
  templateUrl: './register-page.component.html',
})
export class RegisterPageComponent {
  private fb = inject(FormBuilder);
  formUtils = FormUtils;

  myForm = this.fb.group(
    {
      name: ['', [Validators.required, Validators.pattern(FormUtils.namePattern)]],
      email: [
        '',
        [Validators.required, Validators.pattern(FormUtils.emailPattern)],
        [FormUtils.checkingServerResponse],
      ],
      username: [
        '',
        [
          Validators.required,
          Validators.minLength(6),
          Validators.pattern(FormUtils.notOnlySpacesPattern),
          FormUtils.notStrider,
        ],
      ],
      password: ['', [Validators.required, Validators.minLength(6)]],
      password2: ['', Validators.required], // Devería ser confirmPassword
    },
    {
      validators: [FormUtils.areFieldsEqual('password', 'password2', 'mismatchedPasswords')],
    }
  );

  onSubmit() {
    this.myForm.markAllAsTouched();
    console.log(this.myForm.value);
  }
}

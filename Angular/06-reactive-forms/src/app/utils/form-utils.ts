import {
  AbstractControl,
  FormArray,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
} from '@angular/forms';

async function sleep() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, 2500);
  });
}

export class FormUtils {
  // Expresiones regulares
  static namePattern = '([a-zA-Z]+) ([a-zA-Z]+)';
  static emailPattern = '^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$';
  static notOnlySpacesPattern = '^[a-zA-Z0-9]+$';

  static getTextError(errors: ValidationErrors): string | null {
    for (const key of Object.keys(errors)) {
      switch (key) {
        case 'required':
          return 'Este campo es requerido';
        case 'minlength':
          return `Mínimo de ${errors['minlength'].requiredLength} caracteres`;
        case 'min':
          return `Valor mínimo de ${errors['min'].min}`;
        case 'email':
          return 'Debe ingresar un correo válido';
        case 'emailTaken':
          return 'El correo ya está siendo usado por otro usuario';
        case 'noStrider':
          return 'El nombre de usuario "Strider" no está permitido';
        case 'pattern':
          if (errors['pattern'].requiredPattern == this.emailPattern) {
            return 'Debe ingresar un correo válido';
          } else {
            return '';
          }
        default:
          return key;
      }
    }
    return null;
  }

  static isValidField(form: FormGroup, fieldName: string): boolean | null {
    return form.controls[fieldName].errors && form.controls[fieldName].touched;
  }

  static getFieldError(form: FormGroup, fieldName: string): string | null {
    // Si el campo no existe, retornamos nulo
    if (!form.controls[fieldName]) return null;

    const errors = form.controls[fieldName].errors ?? {};

    return FormUtils.getTextError(errors);
  }

  static isValidFieldInArray(formArray: FormArray, index: number) {
    return formArray.controls[index].errors && formArray.controls[index].touched;
  }

  static getFieldInArrayError(formArray: FormArray, index: number) {
    // Si el campo no existe, retornamos nulo
    if (formArray.controls.length === 0) return null;

    const errors = formArray.controls[index].errors ?? {};

    return FormUtils.getTextError(errors);
  }

  // Para hacer las validaciones se necesita una funcion que retorne una funcion
  // Recibe como argumentos el formGroup de tipo AbstractControl, y de ahí podemos empezar a hacer validaciones
  // Esa funcion retornada debe retornar null si todo está bien, o un obj descriptivo (ValidationErrors) si algo salió mal
  static areFieldsEqual(field1: string, field2: string, errorName: string): ValidatorFn {
    return (formGroup: AbstractControl) => {
      const field1Value = formGroup.get(field1)?.value;
      const field2Value = formGroup.get(field2)?.value;

      return field1Value === field2Value ? null : { [errorName]: true };
    };
  }

  static async checkingServerResponse(control: AbstractControl): Promise<ValidationErrors | null> {
    console.log('Validando contra servidor...');
    await sleep();
    const formValue = control.value;

    if (formValue == 'hola@mundo.com') {
      return { emailTaken: true };
    } else {
      return null;
    }
  }

  // Verificar que el nombre de usuario no sea strider
  // Mi solución ?
  // static notStrider(): ValidatorFn {
  //   return (control: AbstractControl) => {
  //     const username = control.value;

  //     return username === 'strider' ? { noStrider: true } : null;
  //   };
  // }

  // Solucion propuesta en video
  static notStrider(control: AbstractControl): ValidationErrors | null {
    const value = control.value;

    return value === 'strider' ? { noStrider: true } : null;
  }
}

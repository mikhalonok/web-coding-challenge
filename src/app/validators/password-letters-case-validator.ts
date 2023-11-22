import { AbstractControl, ValidatorFn } from '@angular/forms';

export function passwordLettersCaseValidator(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    if (!control.value) {
      return null;
    }

    const password = control.value;

    const hasLowercase = /[a-z]/.test(password);
    const hasUppercase = /[A-Z]/.test(password);
    const isCaseValid = hasLowercase && hasUppercase;

    return isCaseValid ? null : { invalidLettersCase: {value: control.value} };
  };
}

import { AbstractControl, ValidatorFn } from '@angular/forms';

export function noNameInPasswordValidator(firstName: string, lastName: string): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    if (!control.value || (!firstName && !lastName)) {
      return null;
    }

    const password = control.value;

    let isValid;

    if (firstName && !lastName) {
      isValid = !password.toLowerCase().includes(firstName.toLowerCase())
    } else if (!firstName && lastName) {
      isValid = !password.toLowerCase().includes(lastName.toLowerCase())
    } else {
      const lowerFirstName = firstName.toLowerCase();
      const lowerLastName = lastName.toLowerCase();
      isValid =
        !password.toLowerCase().includes(lowerFirstName) &&
        !password.toLowerCase().includes(lowerLastName);
    }

    return isValid ? null : { nameInPassword: { value: control.value } };
  };
}

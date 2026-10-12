import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export const passwordMatchValidator: ValidatorFn = (
  control: AbstractControl
): ValidationErrors | null => {
  const password = control.get('password')?.value;
  const confirmPasswordControl = control.get('confirmPassword');

  if (!confirmPasswordControl) return null;

  const confirmPassword = confirmPasswordControl.value;

  const removeMatchError = () => {
    if (confirmPasswordControl.hasError('passwordsDontMatch')) {
      const currentErrors = { ...confirmPasswordControl.errors };
      delete currentErrors['passwordsDontMatch'];

      confirmPasswordControl.setErrors(Object.keys(currentErrors).length ? currentErrors : null);
    }
  };

  if (!confirmPassword) {
    removeMatchError();
    return null;
  }

  if (password !== confirmPassword) {
    confirmPasswordControl.setErrors({
      ...confirmPasswordControl.errors,
      passwordsDontMatch: true,
    });
    return { passwordsDontMatch: true };
  } else {
    removeMatchError();
    return null;
  }
};

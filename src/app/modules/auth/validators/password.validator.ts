import { AbstractControl, ValidatorFn, ValidationErrors } from '@angular/forms';
import { REGEX, VALIDATION_RULES } from '../../../shared/constants/regex.constants';

export function customPasswordValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value;
    if (!value) return null;
    const numericMatches = value.match(REGEX.NUMERIC) || [];
    const specialMatches = value.match(REGEX.SPECIAL_CHAR) || [];
    if (
      numericMatches.length < VALIDATION_RULES.PASSWORD_MIN_NUMERIC ||
      specialMatches.length < VALIDATION_RULES.PASSWORD_MIN_SPECIAL
    ) {
      return {
        weakPassword: true,
      };
    }
    return null;
  };
}

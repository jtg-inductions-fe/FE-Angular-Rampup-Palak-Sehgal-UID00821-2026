import { Validators } from '@angular/forms';
import { VALIDATION_RULES } from '@shared/constants/regex.constants';
import { customPasswordValidator } from './password.validator';

export const AUTH_FORM_RULES = {
  username: [
    Validators.required,
    Validators.minLength(VALIDATION_RULES.USERNAME_MIN),
    Validators.maxLength(VALIDATION_RULES.USERNAME_MAX),
  ],
  password: [
    Validators.required,
    Validators.minLength(VALIDATION_RULES.PASSWORD_MIN),
    customPasswordValidator(),
  ],
};

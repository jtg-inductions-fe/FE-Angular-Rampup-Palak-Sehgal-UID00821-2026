import { Component, inject } from '@angular/core';
import { FormBuilder, Validators, ReactiveFormsModule, FormControl } from '@angular/forms';
import { AUTH_FORM_RULES } from '@auth/validators/auth-form.rules';
import { passwordMatchValidator } from '@auth/validators/match-password.validator';
import { TextInputComponent } from '@shared/components/text-input/text-input.component';
import { ButtonComponent } from '@shared/components/button/button.component';

@Component({
  imports: [ReactiveFormsModule, TextInputComponent, ButtonComponent],
  selector: 'app-register',
  styleUrl: './register.scss',
  templateUrl: './register.html',
})
export class Register {
  private fb = inject(FormBuilder);
  registerForm = this.fb.group(
    {
      username: ['', AUTH_FORM_RULES.username],
      password: ['', AUTH_FORM_RULES.password],
      email: ['', [Validators.required, Validators.email]],
      confirmPassword: ['', [Validators.required]],
    },
    { validators: passwordMatchValidator }
  );
  get username(): FormControl {
    return this.registerForm.get('username') as FormControl;
  }

  get email(): FormControl {
    return this.registerForm.get('email') as FormControl;
  }

  get password(): FormControl {
    return this.registerForm.get('password') as FormControl;
  }

  get confirmPassword(): FormControl {
    return this.registerForm.get('confirmPassword') as FormControl;
  }
  onSubmit() {
    console.log('Register Form Data:', this.registerForm.value);
  }
}

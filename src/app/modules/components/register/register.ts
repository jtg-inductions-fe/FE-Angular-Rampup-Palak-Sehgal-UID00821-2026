import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { AUTH_FORM_RULES } from '../../auth/validators/auth-form.rules';
import { passwordMatchValidator } from '../../auth/validators/match-password.validator';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  imports: [
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    MatIconModule,
    ReactiveFormsModule,
  ],
  selector: 'app-register',
  styleUrl: './register.scss',
  templateUrl: './register.html',
})
export class Register {
  private fb = inject(FormBuilder);
  registerForm: FormGroup = this.fb.group(
    {
      username: ['', AUTH_FORM_RULES.username],
      password: ['', AUTH_FORM_RULES.password],
      email: ['', [Validators.required, Validators.email]],
      confirmPassword: ['', [Validators.required]],
    },
    { validators: passwordMatchValidator }
  );

  onSubmit() {
    console.log('Register Form Data:', this.registerForm.value);
  }
}

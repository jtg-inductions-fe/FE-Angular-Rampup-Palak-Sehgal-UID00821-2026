import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { AUTH_FORM_RULES } from '../../auth/validators/auth-form.rules';

@Component({
  imports: [ReactiveFormsModule],
  selector: 'app-login',
  styleUrl: './login.scss',
  templateUrl: './login.html',
})
export class Login {
  private fb = inject(FormBuilder);
  loginForm: FormGroup = this.fb.group({
    username: ['', AUTH_FORM_RULES.username],
    password: ['', AUTH_FORM_RULES.password],
  });

  onSubmit() {
    if (this.loginForm.valid) {
      console.log('Login form ekdum sahi hai:', this.loginForm.value);
    } else {
      console.log('Validation fail ho gayi!');
    }
  }
}

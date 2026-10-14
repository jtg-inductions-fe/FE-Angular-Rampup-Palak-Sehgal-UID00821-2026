import { Component, inject } from '@angular/core';
import { FormBuilder, Validators, ReactiveFormsModule, FormControl } from '@angular/forms';
import { AUTH_FORM_RULES } from '@auth/validators/auth-form.rules';
import { passwordMatchValidator } from '@auth/validators/match-password.validator';
import { TextInputComponent } from '@shared/components/text-input/text-input.component';
import { ButtonComponent } from '@shared/components/button/button.component';
import { AuthService } from '../../../core/services/auth.service';
import { RegisterRequest } from '../../../core/models';
import { NotificationService } from '../../../core/services/notification.service';
import { Router, RouterLink } from '@angular/router';

@Component({
  imports: [ReactiveFormsModule, TextInputComponent, ButtonComponent, RouterLink],
  selector: 'app-register',
  styleUrl: './register.scss',
  templateUrl: './register.html',
})
export class Register {
  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private notificationService = inject(NotificationService);
  private router = inject(Router);
  registerForm = this.fb.nonNullable.group(
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
  isLoading = false;
  onSubmit() {
    if (this.isLoading) return;
    if (this.registerForm.invalid) {
      this.registerForm.markAllAsTouched();
      return;
    }
    this.isLoading = true;
    if (this.registerForm.valid) {
      const raw = this.registerForm.getRawValue();
      const formData: RegisterRequest = {
        username: raw.username,
        email: raw.email,
        password: raw.password,
      };
      this.authService.register(formData).subscribe({
        next: response => {
          this.notificationService.showSuccess(response.message);
          this.router.navigate(['/']);
          this.isLoading = false;
        },
        error: () => {
          this.isLoading = false;
          // Handled by errorInterceptor
        },
      });
    }
  }
}

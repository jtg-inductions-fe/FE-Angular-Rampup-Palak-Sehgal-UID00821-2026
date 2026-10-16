import { Component, inject } from '@angular/core';
import { FormBuilder, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { TextInputComponent } from '@shared/components/text-input/text-input.component';
import { ButtonComponent } from '@shared/components/button/button.component';
import { LoginRequest } from '../../../core/models';
import { AuthService } from '../../../core/services/auth.service';
import { Router } from '@angular/router';
import { NotificationService } from '../../../core/services/notification.service';

@Component({
  imports: [ReactiveFormsModule, TextInputComponent, ButtonComponent],
  selector: 'app-login',
  styleUrl: '../../auth/auth.component.scss',
  templateUrl: './login.html',
})
export class Login {
  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private router = inject(Router);
  private notificationService = inject(NotificationService);

  loginForm = this.fb.nonNullable.group({
    username: ['', Validators.required],
    password: ['', Validators.required],
  });
  get username(): FormControl {
    return this.loginForm.get('username') as FormControl;
  }

  get password(): FormControl {
    return this.loginForm.get('password') as FormControl;
  }
  isLoading = false;
  onSubmit() {
    if (this.isLoading) return;
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }
    this.isLoading = true;
    if (this.loginForm.valid) {
      const raw = this.loginForm.getRawValue();
      const formData: LoginRequest = {
        username: raw.username,
        password: raw.password,
      };
      this.authService.login(formData).subscribe({
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

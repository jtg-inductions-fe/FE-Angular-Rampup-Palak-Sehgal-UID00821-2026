import { Component, inject } from '@angular/core';
import { FormBuilder, FormControl, ReactiveFormsModule } from '@angular/forms';
import { AUTH_FORM_RULES } from '../../auth/validators/auth-form.rules';
import { TextInputComponent } from '@shared/components/text-input/text-input.component';
import { ButtonComponent } from '@shared/components/button/button.component';
import { LoginRequest } from '../../../core/models';
import { AuthService } from '../../../core/services/auth.service';
import { Router } from '@angular/router';
import { NotificationService } from '../../../core/services/notification.service';

@Component({
  imports: [ReactiveFormsModule, TextInputComponent, ButtonComponent],
  selector: 'app-login',
  styleUrl: './login.scss',
  templateUrl: './login.html',
})
export class Login {
  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private router = inject(Router);
  private notificationService = inject(NotificationService);

  loginForm = this.fb.nonNullable.group({
    username: ['', AUTH_FORM_RULES.username],
    password: ['', AUTH_FORM_RULES.password],
  });
  get username(): FormControl {
    return this.loginForm.get('username') as FormControl;
  }

  get password(): FormControl {
    return this.loginForm.get('password') as FormControl;
  }

  onSubmit() {
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
        },
      });
    } else {
      this.loginForm.markAllAsTouched();
    }
  }
}

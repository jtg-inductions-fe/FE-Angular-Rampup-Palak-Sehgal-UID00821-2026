// src/app/layout/header/header.component.ts
import { Component, inject } from '@angular/core';
import { ButtonComponent } from '@shared/components/button/button.component';
import { AuthService } from '@core/services/auth.service';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [ButtonComponent, NgClass],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class HeaderComponent {
  authService = inject(AuthService);

  onLogout() {
    this.authService.logout();
  }
}

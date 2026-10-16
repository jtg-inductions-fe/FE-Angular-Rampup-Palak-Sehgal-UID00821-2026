import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-not-found',
  standalone: true,
  imports: [RouterLink, MatButtonModule],
  template: `
    <div class="not-found">
      <h1 class="not-found__code">404</h1>
      <h2 class="not-found__title">Page Not Found</h2>
      <p class="not-found__description">
        The page you are looking for doesn't exist or has been moved.
      </p>

      <!-- Directive pehle, normal property (color) fir input/link -->
      <a mat-raised-button color="primary" routerLink="/auth">Back to Home</a>
    </div>
  `,
  styleUrl: './not-found.component.scss',
})
export class NotFoundComponent {}

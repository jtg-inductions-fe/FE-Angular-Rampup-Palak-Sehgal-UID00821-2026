import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-not-found',
  standalone: true,
  imports: [RouterLink, MatButtonModule],
  template: `
    <div class="not-found-container">
      <h1 class="error-code">404</h1>
      <h2>Page Not Found</h2>
      <p>The page you are looking for doesn't exist or has been moved.</p>

      <a mat-raised-button color="primary" routerLink="/auth">Back to Home</a>
    </div>
  `,
  styleUrl: './not-found.component.scss',
})
export class NotFoundComponent {}

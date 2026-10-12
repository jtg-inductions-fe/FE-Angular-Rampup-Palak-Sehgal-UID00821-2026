import { Component } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [SharedModule],
  template: `
    <h2>Dashboard (Standalone based)</h2>
  `,
})
export class DashboardComponent {}

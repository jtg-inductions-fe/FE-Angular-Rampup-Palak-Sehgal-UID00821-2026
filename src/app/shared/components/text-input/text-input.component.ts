import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-text-input',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
  ],
  templateUrl: './text-input.component.html',
  styleUrl: './text-input.component.scss',
})
export class TextInputComponent {
  @Input({ required: true }) control!: FormControl;
  @Input() label = '';
  @Input() placeholder = '';
  @Input() type = 'text';
  @Input() isPassword = false;

  hidePassword = true;

  togglePassword(event: MouseEvent): void {
    event.preventDefault();
    this.hidePassword = !this.hidePassword;
  }

  get errorMessage(): string | null {
    if (this.control.valid || !(this.control.dirty || this.control.touched)) {
      return null;
    }

    if (this.control.hasError('required')) {
      return `${this.label} is required.`;
    }
    if (this.control.hasError('email')) {
      return `Please enter a valid email.`;
    }
    if (this.control.hasError('minlength')) {
      const min = this.control.getError('minlength')?.requiredLength;
      return `Minimum ${min} characters required.`;
    }
    if (this.control.hasError('weakPassword')) {
      return `Must contain at least 2 numbers and 2 special characters.`;
    }
    if (this.control.hasError('passwordsDontMatch')) {
      return `Passwords do not match.`;
    }

    return null;
  }
}

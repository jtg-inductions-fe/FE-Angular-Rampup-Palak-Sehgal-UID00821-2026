import { Component, Output, EventEmitter } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  imports: [MatButtonModule, MatIconModule],
  selector: 'app-floating-button',
  templateUrl: './floating-button.html',
  styleUrl: './floating-button.scss',
})
export class FloatingButton {
  @Output() openDrawer = new EventEmitter<void>();
  onClick() {
    this.openDrawer.emit();
  }
}

import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './modal.html',
  styleUrls: ['./modal.css'],
})
export class Modal {
  @Input() title = 'Nuevo Registro';

  @Input() isOpen = false;

  @Output() close = new EventEmitter<void>();

  closeModal() {
    this.close.emit();
  }
}

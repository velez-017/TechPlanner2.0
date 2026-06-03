import { Component, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Cliente } from '../model/cliente';

@Component({
  selector: 'app-clientes',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './clientes.html',
  styleUrl: './clientes.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Clientes {
  clientes: Cliente[] = [];

  constructor() {

  }
}

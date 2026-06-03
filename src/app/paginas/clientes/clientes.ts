import { Component, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { Sidebar } from '../../layout/sidebar/sidebar';
import { Modal } from '../../shared/modal/modal';

interface Cliente {
  nombre: string;
  empresa: string;
  email: string;
  proyectos: number;
  estado: 'Activo' | 'Pendiente' | 'Inactivo';
}

@Component({
  selector: 'app-clientes',
  standalone: true,
  imports: [CommonModule, FormsModule, Sidebar, Modal],
  templateUrl: './clientes.html',
  styleUrls: ['./clientes.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Clientes {
  clientes: Cliente[] = [
    {
      nombre: 'Juan Pérez',
      empresa: 'TechNova',
      email: 'juan@technova.com',
      proyectos: 5,
      estado: 'Activo',
    },
    {
      nombre: 'Camila Torres',
      empresa: 'Visionary Labs',
      email: 'camila@visionarylabs.io',
      proyectos: 2,
      estado: 'Pendiente',
    },
    {
      nombre: 'Miguel Castro',
      empresa: 'Nova Digital',
      email: 'miguel@novadigital.co',
      proyectos: 1,
      estado: 'Inactivo',
    },
    {
      nombre: 'Laura Gómez',
      empresa: 'Skyline Systems',
      email: 'laura@skyline.ai',
      proyectos: 8,
      estado: 'Activo',
    },
  ];

  modalOpen = false;

  nuevoCliente: Cliente = {
    nombre: '',
    empresa: '',
    email: '',
    proyectos: 0,
    estado: 'Activo',
  };

  openModal() {
    this.modalOpen = true;
  }

  closeModal() {
    this.modalOpen = false;
  }

  guardarCliente() {
    this.clientes.unshift({
      ...this.nuevoCliente,
    });

    this.nuevoCliente = {
      nombre: '',
      empresa: '',
      email: '',
      proyectos: 0,
      estado: 'Activo',
    };

    this.closeModal();
  }
}

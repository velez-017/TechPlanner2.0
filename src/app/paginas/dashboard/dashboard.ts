import { Component, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { Sidebar } from '../../layout/sidebar/sidebar';

interface Actividad {
  titulo: string;
  descripcion: string;
  fecha: string;
}

interface Cotizacion {
  cliente: string;
  proyecto: string;
  total: number;
  estado: 'Aprobada' | 'Pendiente' | 'Cancelada';
}

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, Sidebar],
  templateUrl: './dashboard.html',
  styleUrls: ['./dashboard.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Dashboard {
  constructor(private readonly router: Router) {}

  actividades: Actividad[] = [
    {
      titulo: 'Cotización aprobada',
      descripcion: 'TechNova aprobó propuesta ERP',
      fecha: 'Hace 2 horas',
    },
    {
      titulo: 'Nuevo cliente',
      descripcion: 'Visionary Labs fue agregado',
      fecha: 'Hace 5 horas',
    },
    {
      titulo: 'PDF generado',
      descripcion: 'Cotización COT-2026-011 exportada',
      fecha: 'Hace 1 día',
    },
  ];

  cotizaciones: Cotizacion[] = [
    {
      cliente: 'TechNova',
      proyecto: 'ERP Empresarial',
      total: 18500,
      estado: 'Aprobada',
    },
    {
      cliente: 'Nova Digital',
      proyecto: 'Infraestructura Cloud',
      total: 9200,
      estado: 'Pendiente',
    },
    {
      cliente: 'Visionary Labs',
      proyecto: 'Dashboard Analytics',
      total: 6400,
      estado: 'Cancelada',
    },
  ];

  regresar(): void {
    if (window.history.length > 1) {
      window.history.back();
      return;
    }

    this.router.navigateByUrl('/');
  }
}

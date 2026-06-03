import { Component, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Sidebar } from '../../layout/sidebar/sidebar';

interface Metric {
  titulo: string;
  valor: string;
  cambio: string;
}

interface Proyecto {
  nombre: string;
  progreso: number;
  estado: 'Excelente' | 'Estable' | 'Riesgo';
}

@Component({
  selector: 'app-analytics',
  standalone: true,
  imports: [CommonModule, Sidebar],
  templateUrl: './analytics.html',
  styleUrls: ['./analytics.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Analytics {
  metrics: Metric[] = [
    {
      titulo: 'Revenue',
      valor: '$184K',
      cambio: '+18%',
    },
    {
      titulo: 'Conversion',
      valor: '94%',
      cambio: '+6%',
    },
    {
      titulo: 'Clientes activos',
      valor: '48',
      cambio: '+12%',
    },
    {
      titulo: 'Proyectos',
      valor: '21',
      cambio: '+3%',
    },
  ];

  proyectos: Proyecto[] = [
    {
      nombre: 'ERP Empresarial',
      progreso: 92,
      estado: 'Excelente',
    },
    {
      nombre: 'Infraestructura Cloud',
      progreso: 68,
      estado: 'Estable',
    },
    {
      nombre: 'Dashboard Financiero',
      progreso: 41,
      estado: 'Riesgo',
    },
  ];
}

import { Component, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';

export interface Cotizacion {
  id: string;
  fecha: string;
  cliente: string;
  proyecto: string;
  items: number;
  totalUsd: number;
  estado: 'Completada' | 'Borrador' | 'Cancelada';
}

@Component({
  selector: 'app-cotizaciones-table',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cotizaciones-table.component.html',
  styleUrls: ['./cotizaciones-table.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CotizacionesTableComponent {
  cotizaciones: Cotizacion[] = [
    {
      id: 'COT-001',
      fecha: '2026-05-01',
      cliente: 'TechNova',
      proyecto: 'ERP Empresarial',
      items: 12,
      totalUsd: 18500,
      estado: 'Completada',
    },
    {
      id: 'COT-002',
      fecha: '2026-05-03',
      cliente: 'Visionary Labs',
      proyecto: 'Dashboard Analytics',
      items: 8,
      totalUsd: 9200,
      estado: 'Borrador',
    },
    {
      id: 'COT-003',
      fecha: '2026-05-04',
      cliente: 'Nova Digital',
      proyecto: 'Aplicación Mobile',
      items: 6,
      totalUsd: 6400,
      estado: 'Cancelada',
    },
  ];
}

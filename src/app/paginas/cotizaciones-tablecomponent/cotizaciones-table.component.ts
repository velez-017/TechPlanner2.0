import { Component, ChangeDetectionStrategy, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { QuotationService } from '../../services/quotation.service';
import { Modal } from '../../shared/modal/modal';

export interface Cotizacion {
  id: string;
  fecha: string;
  cliente: string;
  proyecto: string;
  items: number;
  totalUsd: number;
  estado: 'Completada' | 'Borrador' | 'Cancelada';
  responsable?: string;
  prioridad?: 'Alta' | 'Media' | 'Baja';
  vigencia?: string;
  descripcion?: string;
}

@Component({
  selector: 'app-cotizaciones-table',
  standalone: true,
  imports: [CommonModule, FormsModule, Modal],
  templateUrl: './cotizaciones-table.component.html',
  styleUrls: ['./cotizaciones-table.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CotizacionesTableComponent {
  isGeneratingPdf = signal(false);
  isQuotationModalOpen = false;

  nuevaCotizacion: Cotizacion = this.createEmptyQuotation();

  constructor(private readonly quotationService: QuotationService) {}

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
      responsable: 'Equipo Mobile',
      prioridad: 'Baja',
      vigencia: '2026-05-20',
      descripcion: 'Desarrollo mobile con autenticacion, dashboard y reportes.',
    },
  ];

  abrirNuevaCotizacion() {
    this.nuevaCotizacion = this.createEmptyQuotation();
    this.isQuotationModalOpen = true;
  }

  cerrarNuevaCotizacion() {
    this.isQuotationModalOpen = false;
  }

  guardarNuevaCotizacion() {
    this.cotizaciones = [
      {
        ...this.nuevaCotizacion,
        id: this.createQuotationId(),
        items: Number(this.nuevaCotizacion.items) || 0,
        totalUsd: Number(this.nuevaCotizacion.totalUsd) || 0,
      },
      ...this.cotizaciones,
    ];

    this.cerrarNuevaCotizacion();
  }

  generarCotizacionPdf(cotizacion: Cotizacion) {
  alert('NUEVO PDF');
  
  this.isGeneratingPdf.set(true);

  console.log('COTIZACION ENVIADA:', cotizacion);

  this.quotationService.generarPdfCotizacion(cotizacion).subscribe({
    next: (pdfBlob) => {
      this.downloadBlob(
        pdfBlob,
        `cotizacion-${cotizacion.id}.pdf`
      );

      this.isGeneratingPdf.set(false);
    },
    error: (error) => {
      console.error('Error generando PDF:', error);
      this.isGeneratingPdf.set(false);
    },
  });
}


  private downloadBlob(blob: Blob, fileName: string) {
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');

    link.href = url;
    link.download = fileName;
    link.click();

    setTimeout(() => window.URL.revokeObjectURL(url), 100);
  }

  private createEmptyQuotation(): Cotizacion {
    return {
      id: '',
      fecha: new Date().toISOString().slice(0, 10),
      cliente: '',
      proyecto: '',
      items: 1,
      totalUsd: 0,
      estado: 'Borrador',
      responsable: '',
      prioridad: 'Media',
      vigencia: '',
      descripcion: '',
    };
  }

  private createQuotationId(): string {
    const nextId = this.cotizaciones.length + 1;
    return `COT-${nextId.toString().padStart(3, '0')}`;
  }
}

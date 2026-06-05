import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class QuotationService {

  private readonly apiUrl = 'http://localhost:8080/api/quotations/pdf';

  constructor(private readonly http: HttpClient) {}

  /**
   * Genera PDF usando el microservicio real
   * Envía la cotización completa al backend
   */
  generarPdfCotizacion(cotizacion: any): Observable<Blob> {

  const request = {
    usageType: 'general',
    budget: cotizacion.totalUsd,
    components: []
  };

  return this.http.post(
    this.apiUrl,
    request,
    {
      responseType: 'blob'
    }
  );
  }
}

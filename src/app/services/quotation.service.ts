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
    return this.http.post(
      this.apiUrl,
      cotizacion,
      {
        responseType: 'blob'
      }
    );
  }
}
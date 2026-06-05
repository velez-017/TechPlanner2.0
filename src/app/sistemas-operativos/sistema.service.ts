import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import {
  OperatingSystem,
  Architecture,
  HardwareCompatibilityRequest,
  OperatingSystemCompatibilityResponse,
} from './operating-system';

/**
 * Servicio cliente para OS Service (Spring Boot)
 * Endpoints base alineados con la especificación:
 *   http://localhost:8084/api/v1/os-service/operating-systems
 */
@Injectable({ providedIn: 'root' })
export class SistemasOperativosService {
  private apiUrl = 'http://localhost:8084/api/v1/os-service/operating-systems';

  constructor(private http: HttpClient) {}

  getAll(): Observable<OperatingSystem[]> {
    return this.http.get<OperatingSystem[]>(this.apiUrl);
  }

  getPaged(page: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/page/${page}`);
  }

  getById(id: number): Observable<OperatingSystem> {
    return this.http.get<OperatingSystem>(`${this.apiUrl}/${id}`);
  }

  create(os: OperatingSystem): Observable<OperatingSystem> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<OperatingSystem>(this.apiUrl, os, { headers });
  }

  update(os: OperatingSystem): Observable<OperatingSystem> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.put<OperatingSystem>(`${this.apiUrl}/${os.id}`, os, { headers });
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  findActive(): Observable<OperatingSystem[]> {
    return this.http.get<OperatingSystem[]>(`${this.apiUrl}/active`);
  }

  findByArchitecture(architecture: Architecture | string): Observable<OperatingSystem[]> {
    return this.http.get<OperatingSystem[]>(`${this.apiUrl}/architecture/${architecture}`);
  }

  checkCompatibility(request: HardwareCompatibilityRequest): Observable<OperatingSystemCompatibilityResponse[]> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<OperatingSystemCompatibilityResponse[]>(`${this.apiUrl}/compatibility`, request, { headers });
  }

  // --- Helper local (preview) ---
  /**
   * Realiza una verificación local sencilla entre un hardware y un SO para mostrar preview.
   * No reemplaza al backend pero ayuda a UX mientras el backend responde.
   */
  checkCompatibilityPreview(request: HardwareCompatibilityRequest, os: OperatingSystem): OperatingSystemCompatibilityResponse {
    const reasonParts: string[] = [];
    let compatible = true;

    if ((request.ramGb ?? 0) < (os.minRamGb ?? 0)) {
      compatible = false;
      reasonParts.push(`RAM insuficiente (se requieren ${os.minRamGb} GB)`);
    }

    if ((request.storageGb ?? 0) < (os.minStorageGb ?? 0)) {
      compatible = false;
      reasonParts.push(`Almacenamiento insuficiente (se requieren ${os.minStorageGb} GB)`);
    }

    if (os.requiresTpm && !request.tpm) {
      compatible = false;
      reasonParts.push('Requiere TPM');
    }

    if (os.requiresSecureBoot && !request.secureBoot) {
      compatible = false;
      reasonParts.push('Requiere Secure Boot');
    }

    if (String(request.architecture).toUpperCase() !== String(os.architecture).toUpperCase()) {
      compatible = false;
      reasonParts.push('Arquitectura incompatible');
    }

    return {
      operatingSystem: `${os.name} ${os.version}`,
      compatible,
      reason: reasonParts.length ? reasonParts.join('; ') : 'Cumple todos los requisitos',
    };
  }
}


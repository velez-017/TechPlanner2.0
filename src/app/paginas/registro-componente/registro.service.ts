import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Componente } from './componente';

@Injectable({
  providedIn: 'root',
})
export class RegistroService {

  private readonly apiUrl = 'http://localhost:8083/api/v1/component-service/components';

  constructor(private http: HttpClient) {}

  getComponentes(): Observable<Componente[]> {
    return this.http.get<Componente[]>(this.apiUrl);
  }
}

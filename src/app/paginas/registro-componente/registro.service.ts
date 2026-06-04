import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Componente } from './componente';

@Injectable({
  providedIn: 'root',
})
export class ProductoService {
  private apiUrl = 'http://localhost:8081/api/v1/pricing-service/prices';

  constructor(private http: HttpClient) {}

  // ── Obtener todos los productos ────────────────────────────────────────────
  getProductos(): Observable<Componente[]> {
    return this.http.get<Componente[]>(this.apiUrl);
  }

  // ── Obtener un producto por ID ─────────────────────────────────────────────
  getProducto(id: number): Observable<Componente> {
    return this.http.get<Componente>(`${this.apiUrl}/${id}`);
  }

  // ── Crear un nuevo producto ────────────────────────────────────────────────
  createProducto(producto: Componente): Observable<Componente> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<Componente>(this.apiUrl, producto, { headers });
  }

  // ── Actualizar un producto existente ───────────────────────────────────────
  updateProducto(producto: Componente): Observable<Componente> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.put<Componente>(`${this.apiUrl}/${producto.id}`, producto, { headers });
  }

  // ── Eliminar un producto ───────────────────────────────────────────────────
  deleteProducto(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
/*
  // ── Obtener lista de regiones ─────────────────────────────────────────────
  getRegiones(): Observable<Region[]> {
    return this.http.get<Region[]>(`${this.apiUrl}/regiones`);
  }

*/
}

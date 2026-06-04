import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PrecioProducto } from '../paginas/registro-componente/precio-producto';

@Injectable({
  providedIn: 'root',
})
export class ProductoService {
  private apiUrl = 'http://localhost:8081/api/v1/pricing-service/prices';

  constructor(private http: HttpClient) {}

  // ── Obtener todos los productos ────────────────────────────────────────────
  getProductos(): Observable<PrecioProducto[]> {
    return this.http.get<PrecioProducto[]>(this.apiUrl);
  }

  // ── Obtener un producto por ID ─────────────────────────────────────────────
  getProducto(id: number): Observable<PrecioProducto> {
    return this.http.get<PrecioProducto>(`${this.apiUrl}/${id}`);
  }

  // ── Crear un nuevo producto ────────────────────────────────────────────────
  createProducto(producto: PrecioProducto): Observable<PrecioProducto> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<PrecioProducto>(this.apiUrl, producto, { headers });
  }

  // ── Actualizar un producto existente ───────────────────────────────────────
  updateProducto(producto: PrecioProducto): Observable<PrecioProducto> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.put<PrecioProducto>(`${this.apiUrl}/${producto.id}`, producto, { headers });
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

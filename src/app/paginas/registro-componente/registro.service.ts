import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Componente } from './componente';

@Injectable({ providedIn: 'root' })
export class ProductoService {
  // Minimal stub implementations so TypeScript compilation succeeds.
  getProductos(): Observable<Componente[]> {
    return of([]);
  }

  getProducto(id: number): Observable<Componente> {
    return of(new Componente());
  }

  createProducto(producto: Componente): Observable<Componente> {
    return of(producto);
  }

  updateProducto(producto: Componente): Observable<Componente> {
    return of(producto);
  }

  deleteProducto(id: number): Observable<void> {
    return of(undefined as any);
  }
}

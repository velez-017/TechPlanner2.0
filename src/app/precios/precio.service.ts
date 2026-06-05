import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PrecioProducto } from './precio-producto';

/**
 * Servicio de Precios - Alineado con el Microservicio Spring Boot Backend
 *
 * Backend: Pricing Service (Java/Spring Boot + PostgreSQL)
 * - Calcula automáticamente descuentos, impuestos y precio final
 * - Usa @PrePersist para ejecutar calculatePricing() antes de guardar
 * - Expone API REST en: http://localhost:8081/api/v1/pricing-service/prices
 *
 * Frontend: Muestra preview de cálculos mientras edita
 * - Los cálculos finales se hacen en el backend
 * - El frontend recibe la respuesta completa calculada
 */
@Injectable({
  providedIn: 'root',
})
export class ProductoService {
  private apiUrl = 'http://localhost:8081/api/v1/pricing-service/prices';

  // ── Configuración de descuentos por tipo de cliente (Backend) ──────────────
  // Alineado con: Backend Pricing Service calculatePricing()
  private readonly DISCOUNTS: Record<string, number> = {
    'REGULAR': 5,              // Tipo cliente por defecto: 5%
    'EXECUTIVE': 15,           // Ejecutivo: 15%
    'ADMINISTRATIVE': 10,      // Administrativo: 10%
  };

  // ── Configuración de impuestos (IVA) ────────────────────────────────────────
  // Alineado con: Backend Pricing Service (siempre 19%)
  private readonly TAX_RATE: number = 19;

  constructor(private http: HttpClient) {}

  /**
   * Calcula preview de precios localmente (para mostrar al usuario)
   *
   * Nota: El backend SIEMPRE recalculará con @PrePersist
   * Este método es solo para mostrar preview mientras el usuario edita
   *
   * Input: productName, amount, customerType
   * Output: Objeto completo con discountPercentage, taxPercentage, finalPrice
   */
  completeProductData(product: PrecioProducto): PrecioProducto {
    const completed = { ...product };

    // Obtener descuento según tipo de cliente (del backend)
    const discountRate = this.DISCOUNTS[completed.customerType] || this.DISCOUNTS['REGULAR'];
    completed.discountPercentage = discountRate;

    // Calcular precio después de descuento
    const discountAmount = (completed.amount * discountRate) / 100;
    const priceAfterDiscount = completed.amount - discountAmount;

    // IVA siempre 19%
    completed.taxPercentage = this.TAX_RATE;

    // Calcular impuesto sobre el precio con descuento
    const taxAmount = (priceAfterDiscount * this.TAX_RATE) / 100;

    // Precio final: (amount - descuento) + impuesto
    completed.finalPrice = Math.round((priceAfterDiscount + taxAmount) * 100) / 100;

    // Establecer fecha de creación si no existe
    if (!completed.createdAt) {
      completed.createdAt = new Date();
    }

    return completed;
  }

  // ── CRUD Operations - HTTP Calls al Backend ────────────────────────────────

  /**
   * POST /api/v1/pricing-service/prices
   * Obtener todos los productos
   */
  getProductos(): Observable<PrecioProducto[]> {
    return this.http.get<PrecioProducto[]>(this.apiUrl);
  }

  /**
   * GET /api/v1/pricing-service/prices/{id}
   * Obtener un producto por ID
   */
  getProducto(id: number): Observable<PrecioProducto> {
    return this.http.get<PrecioProducto>(`${this.apiUrl}/${id}`);
  }

  /**
   * POST /api/v1/pricing-service/prices
   * Crear un nuevo producto
   * El backend recibe (productName, amount, customerType)
   * y devuelve el objeto completo con cálculos
   */
  createProducto(producto: PrecioProducto): Observable<PrecioProducto> {
    // El backend HARÁ los cálculos, pero enviamos el preview local
    const completed = this.completeProductData(producto);
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<PrecioProducto>(this.apiUrl, completed, { headers });
  }

  /**
   * PUT /api/v1/pricing-service/prices/{id}
   * Actualizar un producto existente
   * El backend recalculará todo según los nuevos valores
   */
  updateProducto(producto: PrecioProducto): Observable<PrecioProducto> {
    // El backend HARÁ los cálculos
    const completed = this.completeProductData(producto);
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.put<PrecioProducto>(`${this.apiUrl}/${completed.id}`, completed, { headers });
  }

  /**
   * DELETE /api/v1/pricing-service/prices/{id}
   * Eliminar un producto
   */
  deleteProducto(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  /**
   * GET /api/v1/pricing-service/prices/page/{pageNumber}
   * Obtener productos paginados
   */
  getProductosPaginados(pageNumber: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/page/${pageNumber}`);
  }
}

/**
 * Modelo que coincide con el DTO del backend (Spring Boot)
 *
 * Entrada esperada (del usuario):
 *   - productName: string
 *   - amount: number
 *   - customerType: 'DEFAULT' | 'EXECUTIVE' | 'ADMINISTRATIVE'
 *
 * Salida entregada (después de cálculos en backend):
 *   - id, productName, amount, customerType
 *   - discountPercentage, taxPercentage, finalPrice (calculados)
 *   - createdAt
 */
export class PrecioProducto {
  id?: number;
  productName: string = '';
  amount!: number;  // Cambió de basePrice a amount (alineado con backend)
  customerType: string = 'DEFAULT';  // Usa tipos del backend: DEFAULT, EXECUTIVE, ADMINISTRATIVE
  discountPercentage!: number;
  taxPercentage: number = 19;  // IVA siempre 19% según backend
  finalPrice!: number;
  createdAt?: Date;
}

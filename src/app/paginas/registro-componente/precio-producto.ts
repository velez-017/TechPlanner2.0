export class PrecioProducto {
  id?: number;
  productName: string = '';
  basePrice!: number;
  customerType: string = '';
  discountPercentage!: number;
  taxPercentage!: number;
  finalPrice!: number;
  createdAt?: Date;
}

import Swal from 'sweetalert2';
import { ProductoService } from './precio.service';
import { PrecioProducto } from './precio-producto';
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';

/**
 * Componente de Gestión de Precios
 *
 * Alineado con el Microservicio Pricing Service (Spring Boot)
 *
 * Responsabilidades:
 * - Mostrar interfaz para crear/editar/eliminar productos
 * - Enviar datos al backend (campo "amount" en lugar de "basePrice")
 * - Tipos de cliente: DEFAULT, EXECUTIVE, ADMINISTRATIVE (del backend)
 * - Mostrar preview de cálculos (que el backend confirmará)
 */
@Component({
  selector: 'app-precios',
  templateUrl: './precios.component.html',
  styleUrls: ['./precios.component.css'],
  imports: [CommonModule],
  standalone: true,
})
export class PreciosComponent implements OnInit {
  public precioProductos: PrecioProducto[] = [];
  public selectedProduct?: PrecioProducto;

  // Tipos de cliente disponibles (del backend)
  public readonly CUSTOMER_TYPES = [
    { code: 'DEFAULT', label: 'Cliente Regular', discount: 5 },
    { code: 'EXECUTIVE', label: 'Ejecutivo', discount: 15 },
    { code: 'ADMINISTRATIVE', label: 'Administrativo', discount: 10 },
  ];

  constructor(private productoService: ProductoService) {
    this.cargarProductos();
  }

  ngOnInit(): void {
    this.cargarProductos();
  }

  // ── Cargar todos los productos desde el servicio ────────────────────────────
  cargarProductos(): void {
    this.productoService.getProductos().subscribe({
      next: (productos) => {
        this.precioProductos = productos;
        console.log('✅ Productos cargados desde backend:', JSON.stringify(this.precioProductos));
      },
      error: (err) => {
        console.error('❌ Error al cargar productos:', err);
        Swal.fire('Error', 'No se pudieron cargar los productos del servidor.', 'error');
      }
    });
  }

  // ── Seleccionar un producto para ver su detalle ────────────────────────────
  selectProduct(product: PrecioProducto): void {
    this.selectedProduct = { ...product };
  }

  // ── Cambiar tipo de cliente y mostrar preview de precio ─────────────────────
  selectCustomerType(typeOrEvent: string | any): void {
    if (!this.selectedProduct) return;

    const type = typeof typeOrEvent === 'string' ? typeOrEvent : (typeOrEvent.target as HTMLSelectElement).value;
    this.selectedProduct.customerType = type;

    // Mostrar preview (el backend confirmará con @PrePersist)
    this.selectedProduct = this.productoService.completeProductData(this.selectedProduct);
  }

  // ── Crear un nuevo producto ────────────────────────────────────────────────
  addProducto(): void {
    Swal.fire({
      title: 'Crear nuevo producto',
      html: `
        <input id="productName" class="swal2-input" placeholder="Nombre del producto (ej: Laptop)">
        <input id="amount" class="swal2-input" type="number" placeholder="Precio base (ej: 1000)" step="0.01" min="0.01">
        <select id="customerType" class="swal2-input">
          <option value="">Selecciona tipo de cliente</option>
          <option value="DEFAULT">Cliente Regular (5% descuento)</option>
          <option value="EXECUTIVE">Ejecutivo (15% descuento)</option>
          <option value="ADMINISTRATIVE">Administrativo (10% descuento)</option>
        </select>
      `,
      showCancelButton: true,
      confirmButtonText: 'Crear',
      cancelButtonText: 'Cancelar',
      preConfirm: () => {
        const productName = (document.getElementById('productName') as HTMLInputElement).value;
        const amount = (document.getElementById('amount') as HTMLInputElement).value;
        const customerType = (document.getElementById('customerType') as HTMLSelectElement).value;

        if (!productName || !amount || !customerType) {
          Swal.showValidationMessage('Todos los campos son obligatorios');
          return false;
        }

        const nuevoProducto = new PrecioProducto();
        nuevoProducto.productName = productName;
        nuevoProducto.amount = Number(amount);
        nuevoProducto.customerType = customerType;

        return nuevoProducto;
      },
    }).then((result) => {
      if (result.isConfirmed && result.value) {
        this.productoService.createProducto(result.value).subscribe({
          next: () => {
            this.cargarProductos();
            Swal.fire('✅ Éxito', 'Producto creado correctamente.', 'success');
          },
          error: (err) => {
            console.error('❌ Error al crear:', err);
            Swal.fire('❌ Error', 'No se pudo crear el producto. Verifica la conexión con el servidor.', 'error');
          }
        });
      }
    });
  }

  // ── Editar un producto existente ────────────────────────────────────────────
  editProducto(precioproducto: PrecioProducto): void {
    Swal.fire({
      title: 'Editar producto',
      html: `
        <input id="productName" class="swal2-input" placeholder="Nombre" value="${precioproducto.productName}">
        <input id="amount" class="swal2-input" type="number" placeholder="Precio base" value="${precioproducto.amount}" step="0.01" min="0.01">
        <select id="customerType" class="swal2-input">
          <option value="DEFAULT" ${precioproducto.customerType === 'DEFAULT' ? 'selected' : ''}>Cliente Regular (5%)</option>
          <option value="EXECUTIVE" ${precioproducto.customerType === 'EXECUTIVE' ? 'selected' : ''}>Ejecutivo (15%)</option>
          <option value="ADMINISTRATIVE" ${precioproducto.customerType === 'ADMINISTRATIVE' ? 'selected' : ''}>Administrativo (10%)</option>
        </select>
      `,
      showCancelButton: true,
      confirmButtonText: 'Guardar',
      cancelButtonText: 'Cancelar',
      preConfirm: () => {
        const productName = (document.getElementById('productName') as HTMLInputElement).value;
        const amount = (document.getElementById('amount') as HTMLInputElement).value;
        const customerType = (document.getElementById('customerType') as HTMLSelectElement).value;

        if (!productName || !amount || !customerType) {
          Swal.showValidationMessage('Todos los campos son obligatorios');
          return false;
        }

        precioproducto.productName = productName;
        precioproducto.amount = Number(amount);
        precioproducto.customerType = customerType;

        return precioproducto;
      },
    }).then((result) => {
      if (result.isConfirmed) {
        this.productoService.updateProducto(result.value).subscribe({
          next: () => {
            this.cargarProductos();
            Swal.fire('✅ Éxito', 'Producto actualizado correctamente.', 'success');
          },
          error: (err) => {
            console.error('❌ Error al actualizar:', err);
            Swal.fire('❌ Error', 'No se pudo actualizar el producto.', 'error');
          }
        });
      }
    });
  }

  // ── Eliminar un producto ───────────────────────────────────────────────────
  confirmDelete(id?: number): void {
    if (!id) return;

    Swal.fire({
      title: '¿Estás seguro?',
      text: 'Esta acción no se puede deshacer',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#6c757d',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        this.productoService.deleteProducto(id).subscribe({
          next: () => {
            this.cargarProductos();
            Swal.fire('🗑️ Eliminado', 'El producto fue eliminado.', 'success');
          },
          error: (err) => {
            console.error('❌ Error al eliminar:', err);
            Swal.fire('❌ Error', 'No se pudo eliminar el producto.', 'error');
          }
        });
      }
    });
  }

  // ── Helper: obtener etiqueta del tipo de cliente ────────────────────────────
  getCustomerTypeLabel(code: string): string {
    const type = this.CUSTOMER_TYPES.find(t => t.code === code);
    return type ? type.label : code;
  }
}

import Swal from 'sweetalert2';
import { ProductoService } from './precio.service';
import { PrecioProducto } from './precio-producto';
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-registro-componente',
  templateUrl: './precios.component.html',
  styleUrls: ['./precios.component.css'],
  imports: [CommonModule],
  standalone: true,
})
export class RegistroComponente implements OnInit {
  public precioProductos: PrecioProducto[] = [];
  // Íconos Font Awesome
  // faEdit = faEdit;
  // faTrash = faTrash;
  // faUserPlus = faUserPlus;

  constructor(private productoService: ProductoService) {
    this.cargarProductos();
  }

  getProductos(): PrecioProducto[] {
    return this.precioProductos;
  }

  ngOnInit(): void {
    this.cargarProductos();
  }

  cargarProductos(): void {
    this.productoService.getProductos().subscribe((productos) => {
      this.precioProductos = productos;
      console.log('Datos:' + JSON.stringify(this.precioProductos));
      //this.productos = this.precioProductos.
    });
  }

  confirmDelete(id: number): void {
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
        this.productoService.deleteProducto(id).subscribe(() => {
          this.cargarProductos();
          Swal.fire('Eliminado', 'El cliente fue eliminado.', 'success');
        });
      }
    });
  }

  editProducto(precioproducto: PrecioProducto): void {
    Swal.fire({
      title: 'Editar producto',
      html: `
        <input id="nombre"   class="swal2-input" placeholder="Nombre"   value="${precioproducto.productName}">
        <input id="precio" class="swal2-input" placeholder="Precio producto" value="${precioproducto.basePrice}">
        <input id="tipo"    class="swal2-input" placeholder="Tipo producto"    value="${precioproducto.customerType}">
      `,
      showCancelButton: true,
      confirmButtonText: 'Guardar',
      cancelButtonText: 'Cancelar',
      preConfirm: () => {
        precioproducto.productName = (document.getElementById('nombre') as HTMLInputElement).value;
        precioproducto.basePrice = Number(document.getElementById('precio') as HTMLInputElement);
        precioproducto.customerType = (document.getElementById('tipo') as HTMLInputElement).value;
        return precioproducto;
      },
    }).then((result) => {
      if (result.isConfirmed) {
        this.productoService.updateProducto(result.value!).subscribe(() => {
          this.cargarProductos();
          Swal.fire('Actualizado', 'El cliente fue actualizado.', 'success');
        });
      }
    });
  }

  addProducto(): void {
    Swal.fire({
      title: 'Nuevo cliente',
      html: `
          <input id="nombre"   class="swal2-input" placeholder="Nombre">
          <input id="precio" class="swal2-input" placeholder="Precio prod">
          <input id="tipo"    class="swal2-input" placeholder="Tipo prod">
        `,
      showCancelButton: true,
      confirmButtonText: 'Crear',
      cancelButtonText: 'Cancelar',
      preConfirm: () => {
        const nombre = (document.getElementById('nombre') as HTMLInputElement).value;
        const precio = (document.getElementById('precio') as HTMLInputElement).value;
        const tipo = (document.getElementById('tipo') as HTMLInputElement).value;
        console.log(nombre);
        console.log(precio);
        console.log(tipo);
        if (!nombre || !tipo) {
          Swal.showValidationMessage('Todos los campos son obligatorios');
          return false;
        }

        const nuevoProducto = new PrecioProducto();
        nuevoProducto.productName = nombre;
        nuevoProducto.customerType = tipo;
        nuevoProducto.basePrice = Number(precio);
        return nuevoProducto;
      },
    }).then((result) => {
      if (result.isConfirmed && result.value) {
        this.productoService.createProducto(result.value).subscribe(() => {
          this.cargarProductos();
          Swal.fire('Creado', 'El producto fue creado exitosamente.', 'success');
        });
      }
    });
  }

  protected readonly PrecioProducto = PrecioProducto;
}

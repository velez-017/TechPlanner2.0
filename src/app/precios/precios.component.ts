import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PrecioProducto } from '../paginas/registro-componente/precio-producto';
import { ProductoService } from './precio.service';

@Component({
  selector: 'app-precios',
  templateUrl: './precios.component.html',
  styleUrls: ['./precios.component.css'],
  imports: [CommonModule],
  standalone: true,
})
export class PreciosComponent implements OnInit {
  public precios!: PrecioProducto[];

  constructor(private productoService: ProductoService) {}

  ngOnInit(): void {
    this.productoService.getProductos().subscribe((p) => (this.precios = p));
  }
}

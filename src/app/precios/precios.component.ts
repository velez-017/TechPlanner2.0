import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PrecioProducto } from '../paginas/registro-componente/precio-producto';

@Component({
  selector: 'app-precios',
  templateUrl: './precios.component.html',
  styleUrl: './precios.component.css',
  imports: [CommonModule],
  standalone: true,
})
export class PreciosComponent implements OnInit {
  ngOnInit(): void {
    this.precios=this.cargarPrecios();
  }

  public precios!: PrecioProducto[];

  private cargarPrecios() {
    return servicioPrecios.getPrecios();
  }
}

import Swal from 'sweetalert2';
import { RegistroService } from './registro.service';
import { Componente } from './componente';
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-registro-componente',
  templateUrl: './registro-componente.html',
  styleUrls: ['./registro-componente.css'],
  imports: [CommonModule],
  standalone: true,
})
export class RegistroComponente implements OnInit {

  public componentes: Componente[] = [];

  constructor(private registroService: RegistroService) {}

  ngOnInit(): void {
    this.cargarComponentes();
  }

  cargarComponentes(): void {
    this.registroService.getComponentes().subscribe({
      next: (productos) => {
        this.componentes = productos;
      },
      error: (err) => {
        console.error(err);

        Swal.fire(
          'Error',
          'No fue posible cargar los componentes',
          'error'
        );
      }
    });
  }
}

import { Routes } from '@angular/router';
import { Clientes } from './clientes/clientes';
import { ClienteDetalle } from './cliente-detalle/cliente-detalle';

export const CLIENTES_ROUTES: Routes = [
  { path: '', component: Clientes },
  { path: 'detalles/:id', component: ClienteDetalle }
];

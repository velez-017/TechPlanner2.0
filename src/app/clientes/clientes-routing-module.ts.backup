import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {Clientes} from './clientes/clientes';
import {ClienteDetalle} from './cliente-detalle/cliente-detalle';

const routes: Routes = [
  {path: '', component: Clientes},
  {path: 'detalles/:id', component: ClienteDetalle}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ClientesRoutingModule {}

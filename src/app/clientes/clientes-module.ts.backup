import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClientesRoutingModule } from './clientes-routing-module';
import { provideHttpClient } from '@angular/common/http';
import { Clientes } from './clientes/clientes';
import { ClienteDetalle } from './cliente-detalle/cliente-detalle';

@NgModule({
  declarations: [Clientes, ClienteDetalle],
  imports: [CommonModule, ClientesRoutingModule],
  providers: [provideHttpClient()],
})
export class ClientesModule {}

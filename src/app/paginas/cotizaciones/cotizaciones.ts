import { ChangeDetectionStrategy, Component } from '@angular/core';

import { Sidebar } from '../../layout/sidebar/sidebar';
import { CotizacionesTableComponent } from '../cotizaciones-tablecomponent/cotizaciones-table.component';

@Component({
  selector: 'app-cotizaciones',
  standalone: true,
  imports: [Sidebar, CotizacionesTableComponent],
  templateUrl: './cotizaciones.html',
  styleUrls: ['./cotizaciones.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Cotizaciones {}

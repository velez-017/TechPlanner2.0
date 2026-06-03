import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Navbar } from '../../components/navbar/navbar';
import { Hero } from '../../inicio-components/hero/hero';
import { Features } from '../../inicio-components/features/features';
import { Stats } from '../../inicio-components/stats/stats';

import { Members } from '../../components/members/members';
import { Promos } from '../../inicio-components/promos/promos';

import { Footer } from '../../components/footer/footer';
import { CotizacionesTableComponent } from '../cotizaciones-tablecomponent/cotizaciones-table.component';

@Component({
  selector: 'app-inicio',
  standalone: true,
  imports: [Navbar, Hero, Features, Stats, Members, Footer, CotizacionesTableComponent, Promos],
  templateUrl: './inicio.html',
  styleUrl: './inicio.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Inicio {}

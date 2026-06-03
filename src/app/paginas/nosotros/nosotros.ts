import { Component, ChangeDetectionStrategy } from '@angular/core';
import { HeroNosotros } from '../../nosotros-components/hero-nosotros/hero-nosotros';
import { StatsNosotros } from '../../nosotros-components/stats-nosotros/stats-nosotros';
import { CtaNosotros } from '../../nosotros-components/cta-nosotros/cta-nosotros';

@Component({
  selector: 'app-nosotros',
  standalone: true,
  imports: [HeroNosotros, StatsNosotros, CtaNosotros],
  templateUrl: './nosotros.html',
  styleUrl: './nosotros.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Nosotros {
}

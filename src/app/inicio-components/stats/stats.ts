import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-stats',
  standalone: true,
  templateUrl: './stats.html',
  styleUrl: './stats.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Stats {}

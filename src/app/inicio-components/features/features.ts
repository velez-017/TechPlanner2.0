import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-features',
  standalone: true,
  templateUrl: './features.html',
  styleUrl: './features.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Features {}

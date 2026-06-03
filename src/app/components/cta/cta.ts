import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-cta',
  standalone: true,
  templateUrl: './cta.html',
  styleUrl: './cta.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Cta {}

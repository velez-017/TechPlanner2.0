import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-members',
  standalone: true,
  templateUrl: './members.html',
  styleUrl: './members.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Members {}

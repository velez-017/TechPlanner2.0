import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-login-header',
  standalone: true,
  templateUrl: './login-header.html',
  styleUrl: './login-header.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginHeader {}

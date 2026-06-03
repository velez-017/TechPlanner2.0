import { Component, ChangeDetectionStrategy } from '@angular/core';
import { LoginHeader } from '../../login-components/login-header/login-header';
import { LoginForm } from '../../login-components/login-form/login-form';
import { Footer } from '../../components/footer/footer';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [LoginHeader, LoginForm, Footer],
  templateUrl: './login.html',
  styleUrl: './login.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Login {}

import { Component, ChangeDetectionStrategy } from '@angular/core';
import { RegistroHeader } from '../../registro-components/registro-header/registro-header';
import { RegistroForm } from '../../registro-components/registro-form/registro-form';

@Component({
  selector: 'app-registro',
  standalone: true,
  imports: [RegistroHeader, RegistroForm],
  templateUrl: './registro.html',
  styleUrl: './registro.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Registro {}

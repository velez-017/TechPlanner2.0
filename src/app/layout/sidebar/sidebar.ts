import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';
import { Router } from '@angular/router';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './sidebar.html',
  styleUrls: ['./sidebar.css'],
})
export class Sidebar {
  constructor(private readonly router: Router) {}

  menuOpen = signal(false);

  toggleMenu() {
    this.menuOpen.update((value) => !value);
  }

  regresar(): void {
    this.router.navigateByUrl('/inicio');
  }
}

import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { Breadcrumb } from '../component/shared/breadcrumb/breadcrumb';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [RouterModule, FormsModule, Breadcrumb, CommonModule],
  templateUrl: './layout.html',
  styleUrls: ['./layout.css']
})
export class Layout {
  quickQuery = '';
  isMenuOpen = false;

  constructor(private router: Router) { }

  toggleMenu(): void {
    this.isMenuOpen = !this.isMenuOpen;
  }

  goSearch(): void {
    this.isMenuOpen = false;
    const q = (this.quickQuery || '').trim();
    // Navega a /busqueda?q=...
    this.router.navigate(['/busqueda'], { queryParams: { q } });
  }
}



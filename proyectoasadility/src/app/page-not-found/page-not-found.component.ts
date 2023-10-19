import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-page-not-found',
  templateUrl: './page-not-found.component.html',
  styleUrls: ['./page-not-found.component.css']
})
export class PageNotFoundComponent {
  constructor(private router: Router) { }

  goToHome() {
    // Navegar a la página principal, ajusta la ruta según tu configuración
    this.router.navigate(['/']);
  }
}

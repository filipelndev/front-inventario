import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { Router } from '@angular/router';
import { AuthService } from './authenticate/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit  {
  title = 'front-inventario';

  subMenusVisibility: { [key: string]: boolean } = {};

  @ViewChild('sidenav', { static: false }) sidenav!: MatSidenav;

  constructor(public authService: AuthService, private router: Router,) {}

  toggleSidenav(): void {
    this.sidenav.toggle();
  }

  toggleSubMenu(menuKey: string): void {
    // Alterna a visibilidade do submenu correspondente ao cabeçalho clicado
    this.subMenusVisibility[menuKey] = !this.subMenusVisibility[menuKey];
}

  isSubMenuVisible(menuKey: string): boolean {
    // Verifica se o submenu correspondente ao cabeçalho está visível
    return this.subMenusVisibility[menuKey];
}

ngOnInit(): void {
    // Restaurar a autenticação ao inicializar o aplicativo, verificando a validade do token
    if (this.authService.isAuthenticated()) {
      this.authService.setAuthenticated(true);
      this.router.navigate(['/dashboard']);
    }
  }

  logoff(): void {
    this.authService.logout();
    this.router.navigate(['login']);
  }
}

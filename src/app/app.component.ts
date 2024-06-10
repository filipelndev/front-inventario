import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { NavigationEnd, Router } from '@angular/router';
import { AuthService } from './authenticate/auth.service';
import { UserService } from './admin/user.service';
import { HomeComponent } from './authenticated/home/home.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit  {
  title = 'App-Inventario';

  subMenusVisibility: { [key: string]: boolean } = {};

  @ViewChild('sidenav', { static: false }) sidenav!: MatSidenav;

  constructor(public authService: AuthService, private router: Router) {}

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
  (document as any).tomticketChatLoaderScriptVersion = 2;

    this.loadTomTicketChat();
  this.router.events.subscribe(event => {
    if (event instanceof NavigationEnd && window.innerWidth <= 768) {
      // Fecha a barra lateral quando uma rota é ativada em dispositivos móveis
      this.sidenav.toggle(false);
    }
  });

  // Restaurar a autenticação ao inicializar o aplicativo, verificando a validade do token
  if (this.authService.isAuthenticated()) {
    this.authService.setAuthenticated(true);
    this.router.navigate(['/dashboard']);
  }
}

  logoff(): void {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    this.router.navigate(['']);
  }

  loadTomTicketChat(): void {
    // Criação do elemento script e atribuição dos atributos necessários
    const ttChatLoaderS = document.createElement('script');
    ttChatLoaderS.src = 'https://duplexsoft.tomticket.com/scripts-chat/chat.min.js'
      + '?id=EP61852'
      + '&autoOpen=0'
      + '&hideWhenOffline=0'
      + '&d=duplexsoft'
      + '&ts=' + new Date().getTime()
      + '&ref=' + encodeURIComponent(document.URL);

    // Adiciona o script ao final do body
    document.body.appendChild(ttChatLoaderS);
  }
}

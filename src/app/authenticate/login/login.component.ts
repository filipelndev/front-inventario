import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username: string = '';
  password: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  login(): void {
    // Substitua esta lógica com a chamada real ao seu serviço de autenticação
    const isAuthenticated = this.fakeBackendAuthentication();

    if (isAuthenticated) {
      // Se a autenticação for bem-sucedida, atualize o estado de autenticação
      this.authService.setAuthenticated(true);
      this.router.navigate(['/dashboard']);
      // Redirecione para a rota desejada
    } else {
      // Se a autenticação falhar, você pode exibir uma mensagem de erro
      console.error('Falha na autenticação. Verifique suas credenciais.');
    }
  }

  // Método de exemplo para simular a autenticação no backend
  private fakeBackendAuthentication(): boolean {
    // Aqui estamos apenas verificando se as credenciais são preenchidas
    return !!this.username && !!this.password;
  }
}


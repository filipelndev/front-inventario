import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { NotificationService } from 'src/app/util/notification.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{
  username = '';
  password = '';

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    // Simule o retorno do backend com token e refreshToken
    const Token = this.authService.getToken();
    const RefreshToken = this.authService.getRefresh();

    // Faça o login no AuthService
    if(Token != null && RefreshToken != null)
    {
      if(this.authService.isAuthenticated()) {
        this.authService.setAuthenticated(true);
        this.router.navigate(['/dashboard']);
      }
    }
  }

  login(): void {
    this.authService.login(this.username, this.password).subscribe(
      () => {
        this.router.navigate(['/dashboard']);
      },
      (error) => {
        // Tratar erros de login aqui, se necessário
        console.error('Erro de login:', error);
      }
    );
  }
}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { JwtHelperService } from '@auth0/angular-jwt';
import { throwError } from 'rxjs';
import { Router } from '@angular/router';
import { UrlService } from '../util/url.service';
import { UserService } from '../admin/user.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = `${this.urlService.apiUrl}usuario/`;
  private isAuthenticatedSubject = new BehaviorSubject<boolean>(false);
  private tokenKey = 'auth_token';
  private refreshkey = 'auth_refresh';

  public userPermission: string = 'Sem permissões';

  // Expor um Observable que outros componentes podem assinar
  isAuthenticated$: Observable<boolean> = this.isAuthenticatedSubject.asObservable();

  constructor(private http: HttpClient, private jwtHelper: JwtHelperService, private router: Router,
    private urlService: UrlService, private userService: UserService) {}

  // Método para verificar o status de autenticação
  isAuthenticated(): boolean {
    const token = localStorage.getItem('access_token');

    return token != null && !this.jwtHelper.isTokenExpired(token);
  }

  // Atualizar o status de autenticação
  setAuthenticated(value: boolean): void {
    this.isAuthenticatedSubject.next(value);
  }


  // Método para realizar o login
  login(username: string, password: string): Observable<any> {
    const loginData = { username, password };

    return this.http.post<any>(`${this.apiUrl}token/`, loginData).pipe(
      tap((response) => {
        if (response.access) {
          this.setToken(response.access);
          this.isAuthenticatedSubject.next(true);
          this.DefinePermissão();
        }
        if(response.refresh)
        {
          this.setRefresh(response.refresh);
        }
      }),
      catchError((error) => {
        // Tratar erros de login aqui
        console.error('Erro de login:', error);
        throw error;
      })
    );
  }

  refreshToken(): Observable<any> {
    const refreshToken = this.getRefresh(); // Obtenha o token de atualização atual
    return this.http.post<any>(`${this.apiUrl}token/refresh/`, refreshToken).pipe(
      tap((token) => {
        console.log("Chamando o refresh token. Token recebido:", token);
        localStorage.setItem('access_token', token);
        this.setAuthenticated(true);
      }),
      catchError((error) => {
        console.error('Erro ao realizar refresh token:', error);
        this.setAuthenticated(false);
        this.logout();
        this.router.navigate(['/fazer-login']);
        return throwError(error);
      })
    );
  }

  // Método para realizar o logout
  logout(): void {
    this.removeToken();
    this.isAuthenticatedSubject.next(false);
  }

  // Método privado para definir o token
  public setToken(token: string): void {
    localStorage.setItem('access_token', token);
  }

  public setRefresh(refresh: string): void {
    localStorage.setItem('refresh_token', refresh)
  }

  // Método privado para obter o token
  public getToken(): string | null {
    return localStorage.getItem('access_token');
  }

  public getRefresh(): string | null {
    return localStorage.getItem('refresh_token');
  }

  // Método privado para remover o token
  public removeToken(): void {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
  }

  DefinePermissão() {
    const token = localStorage.getItem('access_token');
    if (token != null) {
      const userId = this.userService.getUserIdFromToken();
      if(userId != null)
      {
        this.userService.getUserById(userId).subscribe(
          (user) => {
            // Atualizar a permissão com base nas informações do usuário
            this.userPermission = user.is_admin ? 'Administrador' : 'Usuário';
          },
          (error) => {
            console.error('Erro ao obter informações do usuário:', error);
          }
        );
      }

    }
  }

}

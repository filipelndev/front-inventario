import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private isAuthenticatedSubject = new BehaviorSubject<boolean>(false);
  private tokenKey = 'auth_token';
  private refreshkey = 'auth_refresh';

  // Expor um Observable que outros componentes podem assinar
  isAuthenticated$: Observable<boolean> = this.isAuthenticatedSubject.asObservable();

  constructor(private http: HttpClient, private jwtHelper: JwtHelperService) {}

  // Método para verificar o status de autenticação
  isAuthenticated(): boolean {
    const token = localStorage.getItem('access_token');

    if(token != null && !this.jwtHelper.isTokenExpired(token))
    {
      return true ;
    }
      return false;
  }

  // Atualizar o status de autenticação
  setAuthenticated(value: boolean): void {
    this.isAuthenticatedSubject.next(value);
  }


  // Método para realizar o login
  login(username: string, password: string): Observable<any> {
    const loginData = { username, password };

    return this.http.post<any>('http://localhost:8000/usuario/token/', loginData).pipe(
      tap((response) => {
        if (response.access) {
          this.setToken(response.access);
          this.isAuthenticatedSubject.next(true);
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

  // Método para realizar o logout
  logout(): void {
    this.removeToken();
    this.isAuthenticatedSubject.next(false);
  }

  // Método privado para definir o token
  private setToken(token: string): void {
    localStorage.setItem('access_token', token);
  }

  private setRefresh(refresh: string): void {
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
    localStorage.removeItem('acess_token');
    localStorage.removeItem('refresh_token')
  }

}

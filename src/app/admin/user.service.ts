import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, of } from 'rxjs';
import { UrlService } from '../util/url.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private users: any[] = [];
  isAdmin: boolean = false;

  constructor(private http: HttpClient, private urlService: UrlService) {}

  private apiUrl = `${this.urlService.apiUrl}usuario/`;

  getUsers(): Observable<any[]> {
    return this.http.get<any>(`${this.apiUrl}listar/`);
  }

  getUserById(id: number) {
    const url = `${this.apiUrl}${id}/`
    return this.http.get<any>(url);
  }

  updateUserPermissions(userId: number, permissions: any): void {
    const user = this.users.find(u => u.id === userId);
    if (user) {
      user.permissions = permissions;
    }
  }

  cadastrarUsuario(usuario: any): Observable<any> {
    return this.http.post(`${this.apiUrl}cadastrar/`, usuario);
  }

  getUserIdFromToken(): number | null {
    const token = localStorage.getItem('access_token');
    if (token) {
      const payload = JSON.parse(atob(token.split('.')[1]));

      return payload.user_id;
    }

    return null;
  }

  solicitarRedefinicaoSenha(email: string): Observable<any> {
    const url = `${this.apiUrl}password/reset/request/`;

    return this.http.post(url, { email });
  }

  isUserAdmin(): Observable<boolean> {
    const token = localStorage.getItem('access_token');
    const userId = this.getUserIdFromToken();

    if (!userId) {
      // Se não houver ID de usuário no token, retorne um Observable de false
      return of(false);
    }

    // Faça uma chamada assíncrona para obter as informações do usuário
    return this.getUserById(userId).pipe(
      map((user) => {
        // Extraia a informação de isAdmin do usuário
        this.isAdmin = user.is_admin;
        // Retorne true se o usuário for um administrador, caso contrário, false
        return this.isAdmin;
      }),
      catchError((error) => {
        // Trate o erro, por exemplo, exibindo um log
        console.error('Erro ao obter informações do usuário:', error);
        // Retorne false em caso de erro
        return of(false);
      })
    );
  }
}

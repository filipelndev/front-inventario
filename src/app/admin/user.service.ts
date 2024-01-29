import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UrlService } from '../util/url.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private users: any[] = [];

  private apiUrl = `${this.urlService}usuario/`;

  constructor(private http: HttpClient, private urlService: UrlService) {}

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
}

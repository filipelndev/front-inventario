import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private users: any[] = [];

  private apiUrl = 'http://localhost:8000/usuario/';

  constructor(private http: HttpClient) {}

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
}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PermissaoService {
  private baseUrl = 'http://localhost:8000/usuario/grupos';

  constructor(private http: HttpClient) {}

  createGroup(data: any): Observable<any> {
    const url = `${this.baseUrl}/create/`;
    return this.http.post(url, data);
  }

  associateUserWithGroups(userId: number, groupIds: number[]): Observable<any> {
    const url = `${this.baseUrl}/associar/`;
    const data = {
      user_id: userId,
      groups: groupIds
    };

    return this.http.post(url, data);
  }

  buscarDetalhesDoGrupo(id: number) {
    const url = `${this.baseUrl}/${id}/`
    return this.http.get<any>(url);
  }

  getGroups(): Observable<any[]> {
    return this.http.get<any>(`${this.baseUrl}/`);
  }
}

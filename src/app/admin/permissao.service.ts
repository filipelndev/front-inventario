import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UrlService } from '../util/url.service';

@Injectable({
  providedIn: 'root'
})
export class PermissaoService {
  private apiUrl = `${this.urlService.apiUrl}usuario/`;

  constructor(private http: HttpClient, private urlService: UrlService) {}

  createGroup(data: any): Observable<any> {
    const url = `${this.apiUrl}/create/`;
    return this.http.post(url, data);
  }

  associateUserWithGroups(userId: number, groupIds: number[]): Observable<any> {
    const url = `${this.apiUrl}/associar/`;
    const data = {
      user_id: userId,
      groups: groupIds
    };

    return this.http.post(url, data);
  }

  buscarDetalhesDoGrupo(id: number) {
    const url = `${this.apiUrl}/${id}/`
    return this.http.get<any>(url);
  }

  getGroups(): Observable<any[]> {
    return this.http.get<any>(`${this.apiUrl}/`);
  }
}

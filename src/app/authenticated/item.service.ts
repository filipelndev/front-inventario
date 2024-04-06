import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UrlService } from '../util/url.service';

@Injectable({
  providedIn: 'root'
})
export class ItemService {
  private apiUrl = `${this.urlService.apiUrl}suprimentos/item/`;

  constructor(private http: HttpClient, private urlService: UrlService) { }
  // Método para criar uma nova categoria
  criarItem(item: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, item);
  }

  // Método para buscar categoria por ID
  BuscarItem(id: number): Observable<any> {
    const url = `${this.apiUrl}${id}/`;
    return this.http.get<any>(url);
  }

  ListarItem(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }

  // Método para atualizar uma categoria existente
  atualizarItem(id: number, item: any): Observable<any> {
    const url = `${this.apiUrl}${id}/`;
    return this.http.put<any>(url, item);
  }

  alterarStatusItem(id: number, novoStatus: boolean): Observable<any> {
    const url = `${this.apiUrl}${id}/status/`;
    return this.http.patch<any>(url, { status: novoStatus });
  }
}


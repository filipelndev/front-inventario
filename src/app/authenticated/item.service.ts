import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ItemService {
  private baseUrl: string = 'http://127.0.0.1:8000/suprimentos/item/';

  constructor(private http: HttpClient) { }

  // Método para criar uma nova categoria
  criarItem(item: any): Observable<any> {
    return this.http.post<any>(this.baseUrl, item);
  }

  // Método para buscar categoria por ID
  BuscarItem(id: number): Observable<any> {
    const url = `${this.baseUrl}${id}/`;
    return this.http.get<any>(url);
  }

  ListarItem(): Observable<any> {
    return this.http.get<any>(this.baseUrl);
  }

  // Método para atualizar uma categoria existente
  atualizarItem(id: number, item: any): Observable<any> {
    const url = `${this.baseUrl}${id}/`;
    return this.http.put<any>(url, item);
  }

  alterarStatusItem(id: number, novoStatus: boolean): Observable<any> {
    const url = `${this.baseUrl}${id}/status/`;
    return this.http.patch<any>(url, { status: novoStatus });
  }
}


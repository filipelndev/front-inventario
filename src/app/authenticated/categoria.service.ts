import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { UrlService } from '../util/url.service';

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {
  private apiUrl = `${this.urlService.apiUrl}suprimentos/categorias/`;

  constructor(private http: HttpClient, private urlService: UrlService) { }

  // Método para criar uma nova categoria
  criarCategoria(categoria: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, categoria);
  }

  // Método para buscar categoria por ID
  BuscarCategoria(id: number): Observable<any> {
    const url = `${this.apiUrl}${id}/`;
    return this.http.get<any>(url);
  }

  ListarCategoria(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }

  // Método para atualizar uma categoria existente
  atualizarCategoria(id: number, categoria: any): Observable<any> {
    const url = `${this.apiUrl}${id}/`;
    return this.http.put<any>(url, categoria);
  }

  alterarStatusCategoria(id: number, novoStatus: boolean): Observable<any> {
    const url = `${this.apiUrl}${id}/status/`;
    return this.http.patch<any>(url, { status: novoStatus });
  }
}

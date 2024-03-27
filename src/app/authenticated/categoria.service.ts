import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {
  private baseUrl: string = 'http://127.0.0.1:8000/suprimentos/categorias/';

  constructor(private http: HttpClient) { }

  // Método para criar uma nova categoria
  criarCategoria(categoria: any): Observable<any> {
    return this.http.post<any>(this.baseUrl, categoria);
  }

  // Método para buscar categoria por ID
  BuscarCategoria(id: number): Observable<any> {
    const url = `${this.baseUrl}${id}/`;
    return this.http.get<any>(url);
  }

  ListarCategoria(): Observable<any> {
    return this.http.get<any>(this.baseUrl);
  }

  // Método para atualizar uma categoria existente
  atualizarCategoria(id: number, categoria: any): Observable<any> {
    const url = `${this.baseUrl}${id}/`;
    return this.http.put<any>(url, categoria);
  }

  alterarStatusCategoria(id: number, novoStatus: boolean): Observable<any> {
    const url = `${this.baseUrl}${id}/status/`;
    return this.http.patch<any>(url, { status: novoStatus });
  }
}

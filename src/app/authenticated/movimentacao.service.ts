import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UrlService } from '../util/url.service';

@Injectable({
  providedIn: 'root'
})
export class MovimentacaoService {
  private apiUrl = `${this.urlService.apiUrl}suprimentos/movimentacoes-estoque/`;

  constructor(private http: HttpClient, private urlService: UrlService) { }

  // Método para obter todas as movimentações de estoque
  getMovimentacoesEstoque(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }

  // Método para obter uma movimentação de estoque pelo ID
  getMovimentacaoEstoqueById(id: number): Observable<any> {
    const url = `${this.apiUrl}${id}/`;
    return this.http.get<any>(url);
  }

  // Método para criar uma nova movimentação de estoque
  criarMovimentacaoEstoque(movimentacao: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, movimentacao);
  }

  // Método para deletar uma movimentação de estoque pelo ID
  deletarMovimentacaoEstoque(id: number): Observable<any> {
    const url = `${this.apiUrl}${id}/`;
    return this.http.delete(url);
  }
}

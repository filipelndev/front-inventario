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
  getMovimentacoesEstoque(itemId: number, dataInicial?: string, dataFinal?: string): Observable<any[]> {
    let url = `${this.apiUrl}?item_id=${itemId}`;
    console.log(url);
    if (dataInicial && dataFinal == null) {
      url += `&periodo_inicial=${dataInicial}`;
      console.log(url);
    }
    else if (dataInicial && dataFinal)
      {
        url += `&periodo_inicial=${dataInicial}&periodo_final=${dataFinal}`;
        console.log(url);
    }
    return this.http.get<any[]>(url);
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

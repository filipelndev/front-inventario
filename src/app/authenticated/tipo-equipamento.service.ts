import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { TipoEquipamento } from '../Models/TipoEquipamento';
import { UrlService } from '../util/url.service';

@Injectable({
  providedIn: 'root'
})
export class TipoEquipamentoService {
  private apiUrl = `${this.urlService.apiUrl}tipo_equipamento/`; // Adapte para a URL real da sua API

  constructor(private http: HttpClient, private urlService: UrlService) {}

  cadastrarTipoEquipamento(tipoEquipamento: TipoEquipamento): Observable<any> {
    const url = `${this.apiUrl}`;
    return this.http.post(url, tipoEquipamento);
  }

  getTipoEquipamento(): Observable<TipoEquipamento[]> {
    const url = `${this.apiUrl}?page_size=10000`;
    return this.http.get<any>(url);
  }

  alterarStatusTipoEquipamento(id: number, novoStatus: boolean): Observable<TipoEquipamento> {
    const url = `${this.apiUrl}${id}status/`;
    return this.http.patch<TipoEquipamento>(url, { status: novoStatus });
  }

  obterDetalhesTipoEquipamento(tipoEquipamentoId: number): Observable<any> {
    const url = `${this.apiUrl}${tipoEquipamentoId}/`;
    return this.http.get(url);
  }

  obterEquipamentosDoTipo(tipoEquipamentoId: number): Observable<any> {
    const url = `${this.apiUrl}${tipoEquipamentoId}/equipamentos/`;
    return this.http.get<any>(url);
  }

  atualizarTipoEquipamento(id: number, tipoEquipamento: TipoEquipamento): Observable<any> {
    const url = `${this.apiUrl}${id}/`;
    return this.http.put(url, tipoEquipamento)
      .pipe(
        catchError(this.handleError)
      );
  }

  // Método para lidar com erros de requisição HTTP
  private handleError(error: any): Observable<never> {
    let errorMessage = 'Erro desconhecido ao realizar a requisição.';
    if (error.error instanceof ErrorEvent) {
      // Erro do lado do cliente
      errorMessage = `Erro: ${error.error.message}`;
    } else {
      // O backend retornou um código de erro
      errorMessage = `Erro código ${error.status}: ${error.error.message}`;
    }
    console.error(errorMessage);
    return throwError(errorMessage);
  }
}

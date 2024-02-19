import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Equipamento } from '../Models/Equipamento';
import { UrlService } from '../util/url.service';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class EquipamentoService {
  private apiUrl = `${this.urlService.apiUrl}equipamento/`; // Adapte para a URL real da sua API

  constructor(private http: HttpClient, private urlService: UrlService) {}

  getEquipamentos(): Observable<Equipamento[]> {
    const url = `${this.apiUrl}?page_size=10000`;
    return this.http.get<Equipamento[]>(url);
  }

  cadastrarEquipamento(equipamento: Equipamento): Observable<any> {
    const url = `${this.apiUrl}`;
    return this.http.post(url, equipamento);
  }

  editarEquipamento(id: number, equipamento: Equipamento): Observable<any> {
    const url = `${this.apiUrl}${id}/`;
    return this.http.put(url, equipamento);
  }

  excluirEquipamento(id: number): Observable<any> {
    const url = `${this.apiUrl}${id}/`;
    return this.http.delete(url);
  }

  alterarStatusEquipamento(id: number, novoStatus: boolean): Observable<Equipamento> {
    const url = `${this.apiUrl}${id}/status/`;
    return this.http.patch<Equipamento>(url, { status: novoStatus });
  }

  getEquipamentoForId(id: number): Observable<any> {
    const url = `${this.apiUrl}${id}/`;
    return this.http.get(url);
  }

  buscarEquipamentoPorTag(tag: string): Observable<Equipamento | undefined> {
    const url = `${this.apiUrl}`; // Endpoint para buscar todos os equipamentos
    return this.http.get<Equipamento[]>(url).pipe(
      map((equipamentos: Equipamento[]) => equipamentos.find(equipamento => equipamento.tag_patrimonio === tag)),
      catchError(() => of(undefined)) // Retorna Observable<undefined> em caso de erro
    );
  }

  transferirEquipamentoParaEmpresa(equipamentoId: number, empresaDestinoId: number): Observable<any> {
    const url = `${this.apiUrl}${equipamentoId}/transferencia_empresa/`;
    const body = { empresa_destino: empresaDestinoId };
    return this.http.post(url, body);
  }

  getHistoricoEquipamento(equipamentoId: number): Observable<any> {
    const url = `${this.apiUrl}${equipamentoId}/historico/`;
    return this.http.get<any>(url);
  }

  transferirEquipamentoParaColaborador(equipamentoId: number, colaboradorDestinoId: number): Observable<any> {
    const url = `${this.apiUrl}${equipamentoId}/transferencia_colaborador/`;
    const body = { colaborador_destino: colaboradorDestinoId };
    return this.http.post(url, body);
  }

  AlterarSituacao(equipamentoId: number, situacaoId: number): Observable<any> {
    const url = `${this.apiUrl}${equipamentoId}/atualizar_situacao/`;
    const body = { situacao_nova: situacaoId };
    return this.http.put(url, body);
  }
}

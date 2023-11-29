import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TipoEquipamento } from '../Models/TipoEquipamento';

@Injectable({
  providedIn: 'root'
})
export class TipoEquipamentoService {
  private apiUrl = 'http://127.0.0.1:8000'; // Adapte para a URL real da sua API

  constructor(private http: HttpClient) {}

  cadastrarTipoEquipamento(tipoEquipamento: TipoEquipamento): Observable<any> {
    const url = `${this.apiUrl}/tipo_equipamento/`;
    return this.http.post(url, tipoEquipamento);
  }

  getTipoEquipamento(): Observable<TipoEquipamento[]> {
    const url = `${this.apiUrl}/tipo_equipamento/`;
    return this.http.get<any>(url);
  }

  alterarStatusTipoEquipamento(id: number, novoStatus: boolean): Observable<TipoEquipamento> {
    const url = `${this.apiUrl}/tipo_equipamento/${id}/status/`;
    return this.http.patch<TipoEquipamento>(url, { status: novoStatus });
  }
}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Equipamento } from '../Models/Equipamento';
import { Observable } from 'rxjs';
import { UrlService } from '../util/url.service';

@Injectable({
  providedIn: 'root'
})
export class EquipamentoService {
  private apiUrl = `${this.urlService.apiUrl}/equipamento/`; // Adapte para a URL real da sua API

  constructor(private http: HttpClient, private urlService: UrlService) {}

  getEquipamentos(): Observable<Equipamento[]> {
    const url = `${this.apiUrl}`;
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
}

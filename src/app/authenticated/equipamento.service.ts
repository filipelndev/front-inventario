import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Equipamento } from '../Models/Equipamento';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EquipamentoService {
  private apiUrl = 'http://127.0.0.1:8000'; // Adapte para a URL real da sua API

  constructor(private http: HttpClient) {}

  getEquipamentos(): Observable<Equipamento[]> {
    const url = `${this.apiUrl}/equipamento/`;
    return this.http.get<Equipamento[]>(url);
  }

  cadastrarEquipamento(equipamento: Equipamento): Observable<any> {
    const url = `${this.apiUrl}/equipamento/`;
    return this.http.post(url, equipamento);
  }

  editarEquipamento(id: number, equipamento: Equipamento): Observable<any> {
    const url = `${this.apiUrl}/equipamento/${id}/`;
    return this.http.put(url, equipamento);
  }

  excluirEquipamento(id: number): Observable<any> {
    const url = `${this.apiUrl}/equipamento/${id}/`;
    return this.http.delete(url);
  }

  alterarStatusEquipamento(id: number, novoStatus: boolean): Observable<Equipamento> {
    const url = `${this.apiUrl}/equipamento/${id}/status/`;
    return this.http.patch<Equipamento>(url, { status: novoStatus });
  }

  getEquipamentoForId(id: number): Observable<any> {
    const url = `${this.apiUrl}/equipamento/${id}/`;
    return this.http.get(url);
  }
}

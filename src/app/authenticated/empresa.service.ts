import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Empresa } from '../Models/Empresa';
import { UrlService } from '../util/url.service';

@Injectable({
  providedIn: 'root'
})
export class EmpresaService {
  private apiUrl = `${this.urlService.apiUrl}empresa/`;

  constructor(private http: HttpClient, private urlService: UrlService) {}

  getEmpresas(): Observable<Empresa[]> {
    const url = `${this.apiUrl}?page_size=10000`;
    return this.http.get<any>(url);
  }

  getDetalhesEmpresa(id: number): Observable<Empresa> {
    const url = `${this.apiUrl}${id}/`;
    return this.http.get<Empresa>(url);
  }

  getEmpresaPorId(id: number): Observable<Empresa> {
    const url = `${this.apiUrl}${id}/`;
    return this.http.get<any>(url);
  }

  cadastrarEmpresa(empresa: Empresa): Observable<any> {
    const url = `${this.apiUrl}`;
    return this.http.post(url, empresa);
  }

  editarEmpresa(id: number, empresa: Empresa): Observable<any> {
    const url = `${this.apiUrl}${id}/`;
    return this.http.put(url, empresa);
  }

  alterarStatusEmpresa(id: number, novoStatus: boolean): Observable<Empresa> {
    const url = `${this.apiUrl}${id}/status/`;
    return this.http.patch<Empresa>(url, { status: novoStatus });
  }

  getHistoricoTransferencias(id: number): Observable<any> {
    const url = `${this.apiUrl}${id}/transferencias/?page_size=100000`;
    return this.http.get<any>(url);
  }

  getEquipamentosDaEmpresa(idEmpresa: number): Observable<any> {
    const url = `${this.apiUrl}${idEmpresa}/equipamentos/`;
    return this.http.get<any>(url);
  }

  // Método para obter os equipamentos por tipo
  getEquipamentosPorTipo(empresaId: number): Observable<any> {
    const url = `${this.apiUrl}${empresaId}/equipamentos-por-tipo/`;
    return this.http.get<any>(url);
  }

  // Método para obter os equipamentos por status
  getEquipamentosPorStatus(empresaId: number): Observable<any> {
    const url = `${this.apiUrl}${empresaId}/equipamentos-por-status/`;
    return this.http.get<any>(url);
  }

  // Método para obter os equipamentos por setor
  getEquipamentosPorSetor(empresaId: number): Observable<any> {
    const url = `${this.apiUrl}${empresaId}/equipamentos-por-setor/`;
    return this.http.get<any>(url);
  }
}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Empresa } from '../Models/Empresa';

@Injectable({
  providedIn: 'root'
})
export class EmpresaService {
  private apiUrl = 'http://www.duplexsoft.com.br/teste/empresa/'; // Adapte para a URL real da sua API

  constructor(private http: HttpClient) {}

  getEmpresas(): Observable<Empresa[]> {
    const url = `${this.apiUrl}`;
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
    const url = `${this.apiUrl}${id}status/`;
    return this.http.patch<Empresa>(url, { status: novoStatus });
  }
}

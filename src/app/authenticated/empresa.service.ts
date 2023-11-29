import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Empresa } from '../Models/Empresa';

@Injectable({
  providedIn: 'root'
})
export class EmpresaService {
  private apiUrl = 'http://127.0.0.1:8000'; // Adapte para a URL real da sua API

  constructor(private http: HttpClient) {}

  getEmpresas(): Observable<Empresa[]> {
    const url = `${this.apiUrl}/empresa/`; // Adapte a rota conforme a sua API
    return this.http.get<Empresa[]>(url);
  }

  getDetalhesEmpresa(id: number): Observable<Empresa> {
    const url = `${this.apiUrl}/empresa/${id}/`;
    return this.http.get<Empresa>(url);
  }

  cadastrarEmpresa(empresa: Empresa): Observable<any> {
    const url = `${this.apiUrl}/empresa/`;
    return this.http.post(url, empresa);
  }

  editarEmpresa(id: number, empresa: Empresa): Observable<any> {
    const url = `${this.apiUrl}/empresa/${id}/`;
    return this.http.put(url, empresa);
  }

  alterarStatusEmpresa(id: number, novoStatus: boolean): Observable<Empresa> {
    const url = `${this.apiUrl}/empresa/${id}/status/`;
    return this.http.patch<Empresa>(url, { status: novoStatus });
  }
}

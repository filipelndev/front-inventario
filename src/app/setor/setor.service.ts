import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UrlService } from '../util/url.service';
import { Observable } from 'rxjs';
import { Setor } from '../Models/Setor';

@Injectable({
  providedIn: 'root'
})
export class SetorService {
  private apiUrl = `${this.urlService.apiUrl}setor/`;

  constructor(private http: HttpClient, private urlService: UrlService) { }

  cadastrarSetor(setor: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}`, setor);
  }

  listarSetores(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}`);
  }

  buscarSetorPorId(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}${id}/`);
  }

  alterarStatusSetor(id: number, novoStatus: boolean): Observable<Setor> {
    const url = `${this.apiUrl}${id}/status/`;
    return this.http.patch<Setor>(url, { status: novoStatus });
  }

  obterDetalhesSetor(id: number): Observable<Setor> {
    const url = `${this.apiUrl}${id}/`;
    return this.http.get<Setor>(url);
  }

  // Método para atualizar um setor existente
  atualizarSetor(id: number, setor: Setor): Observable<Setor> {
    const url = `${this.apiUrl}${id}/`;
    return this.http.put<Setor>(url, setor);
  }
}

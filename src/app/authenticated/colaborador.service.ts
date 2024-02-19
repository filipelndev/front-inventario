import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Colaborador } from '../Models/Colaborador';
import { map } from 'rxjs/operators';
import { delay, first, tap } from 'rxjs';
import { UrlService } from '../util/url.service';


@Injectable({
  providedIn: 'root'
})
export class ColaboradorService {

  private apiUrl = `${this.urlService.apiUrl}colaborador/`; // Adapte para a URL real da sua API

  constructor(private http: HttpClient, public urlService: UrlService) {}

  getColaboradores(): Observable<Colaborador[]> {
    const url = `${this.apiUrl}`;
    return this.http.get<Colaborador[]>(`${this.apiUrl}?page_size=10000`);
  }

    getColaboradorPorId(id: number): Observable<Colaborador> {
      const url = `${this.apiUrl}${id}/`;
      return this.http.get<any>(url);
    }

  cadastrarColaborador(colaborador: Colaborador): Observable<any> {
    const url = `${this.apiUrl}`;
    return this.http.post(url, colaborador);
  }

  editarColaborador(id: number, colaborador: Colaborador): Observable<any> {
    const url = `${this.apiUrl}${id}/`;
    return this.http.put(url, colaborador);
  }

  alterarStatusColaborador(id: number, novoStatus: boolean): Observable<Colaborador> {
    const url = `${this.apiUrl}${id}/status/`;
    return this.http.patch<Colaborador>(url, { status: novoStatus });
  }

  getEquipamentosDoColaborador(colaboradorId: number): Observable<any> {
    const url = `${this.apiUrl}${colaboradorId}/equipamentos/?page_size=10000`;
    return this.http.get<any>(url);
  }
}

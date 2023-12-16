import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Colaborador } from '../Models/Colaborador';
import { map } from 'rxjs/operators';
import { delay, first, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ColaboradorService {

  private apiUrl = 'http://127.0.0.1:8000'; // Adapte para a URL real da sua API

  constructor(private http: HttpClient) {}

    getColaboradores(): Observable<Colaborador[]> {
      const url = `${this.apiUrl}/colaborador/`;
      return this.http.get<any>(url);
    }

    getColaboradorPorId(id: number): Observable<Colaborador> {
      const url = `${this.apiUrl}/colaborador/${id}/`;
      return this.http.get<any>(url);
    }

  cadastrarColaborador(colaborador: Colaborador): Observable<any> {
    const url = `${this.apiUrl}/colaborador/`;
    return this.http.post(url, colaborador);
  }

  editarColaborador(id: number, colaborador: Colaborador): Observable<any> {
    const url = `${this.apiUrl}/colaborador/${id}/`;
    return this.http.put(url, colaborador);
  }

  alterarStatusColaborador(id: number, novoStatus: boolean): Observable<Colaborador> {
    const url = `${this.apiUrl}/colaborador/${id}/status/`;
    return this.http.patch<Colaborador>(url, { status: novoStatus });
  }
}


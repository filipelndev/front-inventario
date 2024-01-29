import { Injectable } from '@angular/core';
import { ColaboradorService } from '../authenticated/colaborador.service';
import { EmpresaService } from '../authenticated/empresa.service'
import { forkJoin, Observable } from 'rxjs';
import { map } from 'rxjs/operators';import { Empresa } from '../Models/Empresa';
import { HttpClient } from '@angular/common/http';
import { Colaborador } from '../Models/Colaborador';
import { UrlService } from './url.service';
;

@Injectable({
  providedIn: 'root'
})
export class BuscaNomesService {

  constructor(private http: HttpClient, private urlService: UrlService) {}

  obterNomeEmpresaPorId(id: number): Observable<Empresa> {
    const url = `${this.urlService.apiUrl}/empresa/${id}/`;
    return this.http.get<Empresa>(url);
  }

  obterNomeColaboradorPorId(id: number): Observable<string> {
    const url = `${this.urlService.apiUrl}/teste/colaborador/${id}/`;

    return this.http.get<Colaborador>(url).pipe(
      map(colaborador => colaborador.nome)
    );
  }
}


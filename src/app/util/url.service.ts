import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UrlService {
  apiUrl: string = 'http://localhost:8000/';
  //URL localhost: http://localhost:8000/
  //URL do servidor: http://duplexsoft.com.br/teste/
  constructor() { }
}

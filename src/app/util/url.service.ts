import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UrlService {
  apiUrl: string = 'https://duplexsoft.com.br/teste/';
  //URL localhost: http://localhost:8000/
  //URL do servidor: https://duplexsoft.com.br/teste/
  constructor() { }
}

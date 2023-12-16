// auth.service.ts

import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isAuthenticatedSubject = new BehaviorSubject<boolean>(false);

  // Expor um Observable que outros componentes podem assinar
  isAuthenticated$: Observable<boolean> = this.isAuthenticatedSubject.asObservable();

  constructor() {}

  // Atualizar o status de autenticação
  setAuthenticated(value: boolean): void {
    this.isAuthenticatedSubject.next(value);
  }

  // Método para verificar o status de autenticação
  isAuthenticated(): boolean {
    return this.isAuthenticatedSubject.value;
  }
}

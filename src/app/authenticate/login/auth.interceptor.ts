import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpResponse, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService, private router: Router) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (this.authService.isAuthenticated()) {
      return this.addTokenAndContinue(request, next);
    }

    // Se não houver token, continua com a solicitação original
    return next.handle(request).pipe(
      catchError((error) => this.handleError(error))
    );
  }

  private addTokenAndContinue(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // Tentativa de obter um novo token antes de prosseguir com a solicitação
    const token = this.authService.getToken();
        const authRequest = request.clone({
          setHeaders: {
            Authorization: `Bearer ${token}`,
          },
        });
        return this.handleRequest(authRequest, next);

  }

  private handleRequest(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      catchError((error) => {
        if (error instanceof HttpErrorResponse && error.status === 401) {
          // Se o erro for de token expirado, redirecione para o método addTokenAndContinue para tentar renovar o token
          return this.addTokenAndContinue(request, next);
        } else {
          // Se não for um erro de token expirado, repasse o erro
          return throwError(error);
        }
      })
    );
  }

  private handleError(error: any): Observable<never> {
    if (error instanceof HttpErrorResponse && error.status === 401) {
      // Aqui você pode redirecionar para a página de login, exibir um modal de login, ou realizar outra ação específica para lidar com o erro 401.
      console.log('Erro 401: Não autorizado. Redirecionando para a página de login...');
      // Exemplo: redirecionar para a página de login
      this.router.navigate(['']);
    }

    // Propagar o erro para que outros observadores também possam lidar com ele
    return throwError(error);
  }
}

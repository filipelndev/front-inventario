// confirmar-email.component.ts

import { Component } from '@angular/core';
import { UserService } from '../user.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-confirma-email',
  templateUrl: './confirma-email.component.html',
  styleUrls: ['./confirma-email.component.css']
})
export class ConfirmaEmailComponent {
  emailConfirmacao: string = '';
  mensagem: string = '';
  usuarioId: number | null;

  // Variáveis adicionadas para controlar mensagem de erro ou sucesso
  mostrarMensagemErroOuSucesso: boolean = false;
  mensagemErro: string = '';
  mensagemSucesso: string = '';

  constructor(private userService: UserService, private router: Router, private snackBar: MatSnackBar) {
    // Obter o ID do usuário do token ao inicializar o componente
    this.usuarioId = this.userService.getUserIdFromToken();
  }

  confirmarEmail(): void {
    if (this.usuarioId) {
      // Buscar informações do usuário pelo ID
      this.userService.getUserById(this.usuarioId).subscribe(
        user => {
          // Verificar se o e-mail fornecido corresponde ao e-mail do usuário
          if (this.emailConfirmacao === user.email) {
                // Solicitar redefinição de senha após a confirmação bem-sucedida
                this.userService.solicitarRedefinicaoSenha(user.email).subscribe(
                  () => {
                    const errorMessage = "Um email foi enviado para alteração da senha."
                    this.snackBar.open(errorMessage, '', {
                      duration: 3000,
                      horizontalPosition: 'right',
                      verticalPosition: 'bottom',
              });
                  },
                  error => {
                    console.error('Erro ao solicitar redefinição de senha:', error);
                    const errorMessage = "Erro ao solicitar redefinição de senha. Verifique se o email está correto."
                    this.snackBar.open(errorMessage, '', {
                      duration: 3000,
                      horizontalPosition: 'right',
                      verticalPosition: 'bottom',
                    });
                  }
                );
              }
           else {
            const errorMessage = "Erro. Email não confere ou está vazio."
              this.snackBar.open(errorMessage, '', {
                duration: 3000,
                horizontalPosition: 'right',
                verticalPosition: 'bottom',
              });
          }
        },
        error => {
          console.error('Erro ao obter usuário:', error);
          this.mostrarMensagemErroOuSucesso = true;
          this.mensagemErro = 'Erro ao obter informações do usuário. Por favor, tente novamente.';
        }
      );
    } else {
      console.error('ID do usuário não disponível no token.');
    }
  }

  voltarParaUsuarios(): void {
    // Implemente a navegação de volta para a lista de usuários ou página desejada
    this.router.navigate(['/usuario-permissoes']);
  }
}

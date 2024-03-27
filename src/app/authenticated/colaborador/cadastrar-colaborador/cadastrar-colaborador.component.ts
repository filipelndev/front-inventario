import { Component, DebugElement } from '@angular/core';
import { Colaborador } from 'src/app/Models/Colaborador';
import { ColaboradorService } from '../../colaborador.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Location } from '@angular/common';

@Component({
  selector: 'app-cadastrar-colaborador',
  templateUrl: './cadastrar-colaborador.component.html',
  styleUrls: ['./cadastrar-colaborador.component.css']
})
export class CadastrarColaboradorComponent {
  isLoading: boolean = false;

  constructor(private colaboradorService: ColaboradorService, private router: Router,
    private snackBar: MatSnackBar, private location: Location) {}

  colaborador: Colaborador = { nome: '', cpf: '', status: true };
  mensagemCadastro: string | null = null;
  snackbarBackground: string = '';

  onSubmit(): void {
    this.colaboradorService.cadastrarColaborador(this.colaborador)
      .subscribe(
        response => {
          this.colaborador = { nome: '', cpf: '', status: true };
          this.snackBar.open('Colaborador cadastrado com sucesso!', '', {
            duration: 3000,
            horizontalPosition: 'right',
            verticalPosition: 'bottom',
          });
        },
        (errorResponse) => {
          console.error('Erro ao cadastrar o colaborador:', errorResponse);

          // Verifica se há erros específicos do campo e formata-os
          let errorMessage = "Erro ao atualizar o colaborador:";
          const errors = errorResponse.error;
          Object.keys(errors).forEach(key => {
            const fieldErrors = errors[key];
            fieldErrors.forEach((error: string) => {
              errorMessage += `\n${key}: ${error}`;
            });
          });

          // Exibe a mensagem de erro formatada
          this.snackBar.open(errorMessage, '', {
            duration: 5000, // Aumente a duração para dar tempo suficiente para ler
            horizontalPosition: 'right',
            verticalPosition: 'bottom',
          });
        }
      );
  }

  toggle() {
    this.colaborador.status = !this.colaborador.status;
  }

  voltarParaUsuarios(): void {
    // Implemente a navegação de volta para a lista de usuários ou página desejada
    this.location.back();
  }

}

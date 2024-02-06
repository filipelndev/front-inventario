import { Component, DebugElement } from '@angular/core';
import { Colaborador } from 'src/app/Models/Colaborador';
import { ColaboradorService } from '../../colaborador.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-cadastrar-colaborador',
  templateUrl: './cadastrar-colaborador.component.html',
  styleUrls: ['./cadastrar-colaborador.component.css']
})
export class CadastrarColaboradorComponent {

  constructor(private colaboradorService: ColaboradorService, private router: Router,
    private snackBar: MatSnackBar) {}

  colaborador: Colaborador = { nome: '', cpf: '', status: true };
  mensagemCadastro: string | null = null;
  snackbarBackground: string = '';

  onSubmit(): void {
    this.colaboradorService.cadastrarColaborador(this.colaborador)
      .subscribe(
        response => {
          console.log('Colaborador cadastrado com sucesso!', response);
          this.colaborador = { nome: '', cpf: '', status: true };
          this.snackBar.open('Colaborador cadastrado com sucesso!', '', {
            duration: 3000,
            horizontalPosition: 'right',
            verticalPosition: 'bottom',
          });
        },
        error => {
          console.error('Erro ao cadastrar colaborador', error);
          const errorMessage = "Preencha os campos destacados em vermelho."
          this.snackBar.open(errorMessage, '', {
            duration: 3000,
            horizontalPosition: 'right',
            verticalPosition: 'bottom',
          });
        }
      );
  }

  toggle() {
    this.colaborador.status = !this.colaborador.status;
  }

  onVoltarClick(): void {
    this.router.navigate(['/dashboard']);
  }

}

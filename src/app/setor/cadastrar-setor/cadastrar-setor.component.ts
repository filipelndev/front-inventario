import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SetorService } from '../setor.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-cadastrar-setor',
  templateUrl: './cadastrar-setor.component.html',
  styleUrls: ['./cadastrar-setor.component.css']
})
export class CadastrarSetorComponent{

  constructor(private setorService: SetorService, private router: Router,
    private snackBar: MatSnackBar,
    private location: Location) {}

  isLoading: boolean = false;
  setor: any = { nome: '', status: true };
  mensagemCadastro: string | null = null;
  snackbarBackground: string = '';

  onSubmit(): void {
    this.setorService.cadastrarSetor(this.setor)
      .subscribe(
        response => {
          console.log('Setor cadastrado com sucesso!', response);
          this.setor = { nome: '', descricao: '', status: true };
          this.snackBar.open('Setor cadastrado com sucesso!', '', {
            duration: 3000,
            horizontalPosition: 'right',
            verticalPosition: 'bottom',
          });
        },
        error => {
          console.error('Erro ao cadastrar setor', error);
          const errorMessage = "Preencha os campos destacados em vermelho."
          this.snackBar.open(errorMessage, '', {
            duration: 3000,
            horizontalPosition: 'right',
            verticalPosition: 'bottom',
          });
        }
      );
  }

  voltarParaSetores(): void {
    this.location.back();
  }
}

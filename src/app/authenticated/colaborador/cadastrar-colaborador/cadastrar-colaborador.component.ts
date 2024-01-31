import { Component, DebugElement } from '@angular/core';
import { Colaborador } from 'src/app/Models/Colaborador';
import { ColaboradorService } from '../../colaborador.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cadastrar-colaborador',
  templateUrl: './cadastrar-colaborador.component.html',
  styleUrls: ['./cadastrar-colaborador.component.css']
})
export class CadastrarColaboradorComponent {

  constructor(private colaboradorService: ColaboradorService, private router: Router) {}

  colaborador: Colaborador = { nome: '', cpf: '', status: true };
  mensagemCadastro: string | null = null;

  onSubmit(): void {

    this.colaboradorService.cadastrarColaborador(this.colaborador)
      .subscribe(
        response => {
          console.log('Colaborador cadastrado com sucesso!', response);
          this.colaborador = { nome: '', cpf: '', status: true };
          this.mensagemCadastro = 'Colaborador cadastrado com sucesso!'
          setTimeout(() => {
            this.mensagemCadastro = null;
          }, 4000);

        },
        error => {
          console.error('Erro ao cadastrar colaborador', error);
          this.mensagemCadastro = 'Erro ao cadastrar colaborador. Por favor, tente novamente.';
          setTimeout(() => {
            this.mensagemCadastro = null;
          }, 4000);
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

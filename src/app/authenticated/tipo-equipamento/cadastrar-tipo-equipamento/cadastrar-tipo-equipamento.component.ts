import { Component } from '@angular/core';
import { TipoEquipamento } from 'src/app/Models/TipoEquipamento';
import { TipoEquipamentoService } from '../../tipo-equipamento.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Location } from '@angular/common';

@Component({
  selector: 'app-cadastrar-tipo-equipamento',
  templateUrl: './cadastrar-tipo-equipamento.component.html',
  styleUrls: ['./cadastrar-tipo-equipamento.component.css']
})
export class CadastrarTipoEquipamentoComponent {

  isLoading: boolean = false;
  tipoEquipamento: TipoEquipamento = { tipo: '', status: true };
  mensagemCadastro: string | null = null;

  constructor(private tipoEquipamentoService: TipoEquipamentoService,
    private router: Router, private snackBar: MatSnackBar, private location: Location) {}  // Injete o serviço no construtor

  onSubmit(): void {
    // Chama o serviço para cadastrar o tipo de equipamento
    this.tipoEquipamentoService.cadastrarTipoEquipamento(this.tipoEquipamento).subscribe(
      (response) => {
        this.tipoEquipamento = { tipo: '', status: true };
        const errorMessage = "Tipo de equipamento cadastrado com sucesso!."
          this.snackBar.open(errorMessage, '', {
            duration: 3000,
            horizontalPosition: 'right',
            verticalPosition: 'bottom',
          });
      },
      (errorResponse) => {
        console.error('Erro ao cadastrar o tipo de equipamento:', errorResponse);

        // Verifica se há erros específicos do campo e formata-os
        let errorMessage = "Erro ao cadastrar o tipo de equipamento:";
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

  voltarParaUsuarios(): void {
    this.location.back();
  }
}

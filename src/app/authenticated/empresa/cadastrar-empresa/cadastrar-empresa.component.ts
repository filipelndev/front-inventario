import { Component } from '@angular/core';
import { Empresa } from 'src/app/Models/Empresa';
import { EmpresaService } from '../../empresa.service';
import { Location } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-cadastrar-empresa',
  templateUrl: './cadastrar-empresa.component.html',
  styleUrls: ['./cadastrar-empresa.component.css']
})
export class CadastrarEmpresaComponent {
  isLoading: boolean = false;
  empresa: Empresa = { nome: '', cnpj: '',  status: true };
  mensagemCadastro: string | null = null;
  constructor(private empresaService: EmpresaService,
    private location: Location, private snackBar: MatSnackBar) {}

  onSubmit(): void {
    this.empresaService.cadastrarEmpresa(this.empresa).subscribe(
      (response) => {
        this.empresa = { nome: '', cnpj: '', status: true };
        const errorMessage = "Empresa cadastrada com sucesso!."
          this.snackBar.open(errorMessage, '', {
            duration: 3000,
            horizontalPosition: 'right',
            verticalPosition: 'bottom',
          });
      },
      (errorResponse) => {
        console.error('Erro ao cadastrar a empresa:', errorResponse);

        // Verifica se há erros específicos do campo e formata-os
        let errorMessage = "Erro ao cadastrar a empresa:";
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
    // Implemente a navegação de volta para a lista de usuários ou página desejada
    this.location.back();
  }
}

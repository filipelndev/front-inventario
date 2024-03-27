import { Component, OnInit } from '@angular/core';
import { Empresa } from 'src/app/Models/Empresa';
import { EmpresaService } from '../../empresa.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-editar-empresa',
  templateUrl: './editar-empresa.component.html',
  styleUrls: ['./editar-empresa.component.css']
})
export class EditarEmpresaComponent implements OnInit {
  isLoading: boolean = false;
  empresa: any;

  constructor(
    private empresaService: EmpresaService,
    private snackBar: MatSnackBar,
    private route: ActivatedRoute,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.isLoading = true;
    this.route.paramMap.subscribe(params => {
      const empresaId = Number(params.get('id'));
      if (empresaId) {
        this.empresaService.getEmpresaPorId(empresaId).subscribe(
          (empresa: Empresa) => {
            this.empresa = empresa;
            this.isLoading = false;
          },
          error => {
            this.isLoading = false;
            console.error('Erro ao carregar empresa:', error);
            // Lidar com o erro, se necessário
          }
        );
      }
    });
  }

  voltarParaUsuarios(): void {
    // Implemente a navegação de volta para a lista de usuários ou página desejada
    this.location.back();
  }

  onSubmit() {
    // Lógica para salvar a empresa

    // Verificar se o ID da empresa está definido
    if (this.empresa.id !== undefined) {
      // Chamar o serviço para editar a empresa
      this.empresaService.editarEmpresa(this.empresa.id, this.empresa).subscribe(
        (empresaAtualizada) => {
          const errorMessage = "Empresa atualizada com sucesso!."
          this.snackBar.open(errorMessage, '', {
            duration: 3000,
            horizontalPosition: 'right',
            verticalPosition: 'bottom',
          });
          this.location.back();
        },
        (errorResponse) => {
          console.error('Erro ao atualizar a empresa:', errorResponse);

          // Verifica se há erros específicos do campo e formata-os
          let errorMessage = "Erro ao atualizar a empresa:";
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
    } else {
      console.error('ID da empresa é indefinido. Não é possível editar.');
      const errorMessage = "Erro ao encontrar a empresa. ID não existe ou é indefinido."
      this.snackBar.open(errorMessage, '', {
        duration: 3000,
        horizontalPosition: 'right',
        verticalPosition: 'bottom',
      });
    }
  }

}

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Colaborador } from 'src/app/Models/Colaborador';
import { ColaboradorService } from '../../colaborador.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Location } from '@angular/common';

@Component({
  selector: 'app-editar-colaborador',
  templateUrl: './editar-colaborador.component.html',
  styleUrls: ['./editar-colaborador.component.css']
})
export class EditarColaboradorComponent implements OnInit {

  isLoading: boolean = false;
  colaborador?: any;
  isChecked = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private colaboradorService: ColaboradorService,
    private snackBar: MatSnackBar,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.isLoading = true;
    this.route.paramMap.subscribe(params => {
      const colaboradorId = Number(params.get('id'));
      if (colaboradorId) {
        this.colaboradorService.getColaboradorPorId(colaboradorId).subscribe(
          (colaborador: Colaborador) => {
            this.colaborador = colaborador;
            this.isLoading = false;
          },
          error => {
            this.isLoading = false;
            console.error('Erro ao carregar colaborador:', error);
            this.snackBar.open('erro ao carregar Colaborador, entre em contato com o suporte.', '', {
              duration: 5000,
              horizontalPosition: 'right',
              verticalPosition: 'bottom',
            });
          }
        );
      }
    });
  }

  voltarParaUsuarios(): void {
    // Implemente a navegação de volta para a lista de usuários ou página desejada
    this.location.back();
  }

  toggle() {
    if(this.colaborador)
    this.colaborador.status = !this.colaborador.status;
  }

  onSubmit() {
    if (this.colaborador)
    {
      if (this.colaborador.id) {
        this.colaboradorService.editarColaborador(this.colaborador.id, this.colaborador).subscribe(
          (colaboradorAtualizado) => {
            this.snackBar.open('Colaborador atualizado com sucesso!', '', {
              duration: 5000,
              horizontalPosition: 'right',
              verticalPosition: 'bottom',
            });
            this.location.back();
          },
          (errorResponse) => {
            console.error('Erro ao atualizar o colaborador:', errorResponse);

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
      } else {
        console.error('ID do colaborador é indefinido. Não é possível editar.');
        const errorMessage = "Erro ao encontrar o colaborador. ID não existe ou é indefinido."
        this.snackBar.open(errorMessage, '', {
          duration: 3000,
          horizontalPosition: 'right',
          verticalPosition: 'bottom',
        });
      }
    }
  }
}

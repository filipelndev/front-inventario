import { Component, OnInit } from '@angular/core';
import { CategoriaService } from '../../categoria.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Location } from '@angular/common';
import { TipoEquipamentoService } from '../../tipo-equipamento.service';
import { TipoEquipamento } from 'src/app/Models/TipoEquipamento';

@Component({
  selector: 'app-cadastrar-categoria',
  templateUrl: './cadastrar-categoria.component.html',
  styleUrls: ['./cadastrar-categoria.component.css']
})
export class CadastrarCategoriaComponent implements OnInit {
  isLoading: boolean = false;
  tipoEquipamento?: TipoEquipamento[] = [];

  constructor(private categoriaService: CategoriaService, private router: Router,
    private snackBar: MatSnackBar, private location: Location,  private tipoEquipamentoService: TipoEquipamentoService) {}
  ngOnInit(): void {
    this.carregarTipo();
  }

  categoria?: any = { nome: '', descricao: '', tipo_equipamento: [] };
  mensagemCadastro?: string | null = null;
  snackbarBackground?: string = '';

  onSubmit(): void {
    this.categoriaService.criarCategoria(this.categoria)
      .subscribe(
        response => {
          this.categoria = { nome: '', descricao: '', tiposEquipamentos: [] };
          this.snackBar.open('Categoria cadastrada com sucesso!', '', {
            duration: 3000,
            horizontalPosition: 'right',
            verticalPosition: 'bottom',
          });
        },
        (errorResponse) => {
          console.error('Erro ao cadastrar a categoria:', errorResponse);

          // Verifica se há erros específicos do campo e formata-os
          let errorMessage = "Erro ao cadastrar a categoria:";
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

  carregarTipo(): void {
    this.tipoEquipamentoService.getTipoEquipamento().subscribe((tipoEquipamento: any) => {
      this.tipoEquipamento = tipoEquipamento.results;
      this.isLoading = false;
    });
  }

  voltarParaCategorias(): void {
    // Implemente a navegação de volta para a lista de categorias ou página desejada
    this.location.back();
  }
}

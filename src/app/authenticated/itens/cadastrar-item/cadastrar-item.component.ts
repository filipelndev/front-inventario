import { Component, OnInit } from '@angular/core';
import { CategoriaService } from '../../categoria.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Location } from '@angular/common';
import { ItemService } from '../../item.service';

@Component({
  selector: 'app-cadastrar-item',
  templateUrl: './cadastrar-item.component.html',
  styleUrls: ['./cadastrar-item.component.css']
})
export class CadastrarItemComponent implements OnInit {
  isLoading: boolean = false;
  categorias?: any[] = [];

  constructor(private categoriaService: CategoriaService, private itemService: ItemService,
    private snackBar: MatSnackBar, private location: Location) {}
  ngOnInit(): void {
    this.carregarCategoria();
  }

  item?: any = { nome: '', categoria: '', status: true,  };
  mensagemCadastro?: string | null = null;
  snackbarBackground?: string = '';

  onSubmit(): void {
    this.itemService.criarItem(this.item)
      .subscribe(
        response => {
          this.item = { nome: '', categoria: '', status: true };
          this.snackBar.open('Item cadastrado com sucesso!', '', {
            duration: 3000,
            horizontalPosition: 'right',
            verticalPosition: 'bottom',
          });
        },
        (errorResponse) => {
          console.error('Erro ao cadastrar item:', errorResponse);

          // Verifica se há erros específicos do campo e formata-os
          let errorMessage = "Erro ao cadastrar item:";
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

  carregarCategoria(): void {
    this.categoriaService.ListarCategoria().subscribe((categoria: any) => {
      this.categorias = categoria.results;
      console.log(categoria.results);
      this.isLoading = false;
    });
  }

  voltarParaItem(): void {
    // Implemente a navegação de volta para a lista de categorias ou página desejada
    this.location.back();
  }
}

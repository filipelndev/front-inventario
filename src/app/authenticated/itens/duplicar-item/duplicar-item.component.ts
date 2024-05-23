import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Location } from '@angular/common';
import { ItemService } from '../../item.service';
import { CategoriaService } from '../../categoria.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-duplicar-item',
  templateUrl: './duplicar-item.component.html',
  styleUrls: ['./duplicar-item.component.css']
})
export class DuplicarItemComponent implements OnInit {

  isLoading: boolean = false;
  item: any = { nome: '', categoria: '', status: true };
  categorias: any[] = [];
  nome: any;

  constructor(
    private snackBar: MatSnackBar,
    private location: Location,
    private itemService: ItemService,
    private route: ActivatedRoute,
    private categoriaService: CategoriaService
  ) {}

  ngOnInit(): void {
    this.isLoading = true;
    this.route.paramMap.subscribe(params => {
      const itemId = Number(params.get('id'));
      if (itemId) {
        this.itemService.BuscarItem(itemId).subscribe(
          (item: any) => {
            this.item = item;
            console.log(item);
            this.carregarCategoria(); // Carregar categorias após o sucesso ao carregar o item
          },
          error => {
            this.isLoading = false;
            console.error('Erro ao carregar item:', error);
            this.snackBar.open('Erro ao carregar item', '', {
              duration: 3000,
              horizontalPosition: 'right',
              verticalPosition: 'bottom',
              panelClass: ['snackbar-error']
            });
          }
        );
      } else {
        this.carregarCategoria(); // Carregar categorias se não houver itemId
      }
    });
  }

  carregarCategoria(): void {
    this.categoriaService.ListarCategoria().subscribe(
      (categoria: any) => {
        this.categorias = categoria.results;
        console.log(categoria.results);
        this.isLoading = false;
      },
      error => {
        this.isLoading = false;
        console.error('Erro ao listar categorias:', error);
        this.snackBar.open('Erro ao listar categorias', '', {
          duration: 3000,
          horizontalPosition: 'right',
          verticalPosition: 'bottom',
          panelClass: ['snackbar-error']
        });
      }
    );
  }

  onSubmit(): void {

    const itemToSend: any = {
    nome: this.nome,
    categoria: this.item.categoria_id,
    status: true };
    this.itemService.criarItem(itemToSend).subscribe(
      response => {
        this.item = { nome: '', categoria: '', status: true };
        this.snackBar.open('Item cadastrado com sucesso!', '', {
          duration: 3000,
          horizontalPosition: 'right',
          verticalPosition: 'bottom',
          panelClass: ['snackbar-success']
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
          panelClass: ['snackbar-error']
        });
      }
    );
  }

  voltar(): void {
    this.location.back();
  }
}

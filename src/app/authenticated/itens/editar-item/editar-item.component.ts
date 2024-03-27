import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CategoriaService } from '../../categoria.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ItemService } from '../../item.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-editar-item',
  templateUrl: './editar-item.component.html',
  styleUrls: ['./editar-item.component.css']
})
export class EditarItemComponent implements OnInit {

  isLoading: boolean = false;
  item?: any;
  categorias?: any[] = [];

  constructor(
    private route: ActivatedRoute,
    private categoriaService: CategoriaService,
    private snackBar: MatSnackBar,
    private location: Location,
    private itemService: ItemService
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
            this.carregarCategoria();
            this.isLoading = false;
          },
          error => {
            this.isLoading = false;
            console.error('Erro ao carregar item:', error);
            // Lidar com o erro, se necessário
          }
        );
      }
    });
    this.carregarCategoria();
    console.log(this.item.categoria);
  }

  carregarCategoria(): void {
    this.categoriaService.ListarCategoria().subscribe((categoria: any) => {
      this.categorias = categoria.results;
      this.isLoading = false;
    });
  }

  onSubmit(): void {
    // Extrai apenas o ID da categoria do objeto do item
    const categoriaId = this.item.categoria_id;

    // Cria um novo objeto do item contendo apenas o nome e o status
    const itemToSend = {
      nome: this.item.nome,
      status: this.item.status,
      categoria: categoriaId
    };
    console.log(itemToSend);

    this.itemService.atualizarItem(this.item.id, itemToSend).subscribe(
      () => {
        this.snackBar.open('Item atualizado com sucesso!', '', {
          duration: 3000,
          horizontalPosition: 'right',
          verticalPosition: 'bottom',
        });
        this.location.back();
      },
      error => {
        console.error('Erro ao atualizar categoria:', error);
        let errorMessage = 'Erro ao atualizar categoria:';
        if (error.error && typeof error.error === 'string') {
          errorMessage += `\n${error.error}`;
        }
        this.snackBar.open(errorMessage, '', {
          duration: 5000,
          horizontalPosition: 'right',
          verticalPosition: 'bottom',
        });
      }
    );
  }

  voltarParaCategorias(): void {
    this.location.back();
  }
}

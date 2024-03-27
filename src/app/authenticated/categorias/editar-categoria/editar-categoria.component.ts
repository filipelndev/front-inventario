import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoriaService } from '../../categoria.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Location } from '@angular/common';
import { TipoEquipamentoService } from '../../tipo-equipamento.service';
import { TipoEquipamento } from 'src/app/Models/TipoEquipamento';

@Component({
  selector: 'app-editar-categoria',
  templateUrl: './editar-categoria.component.html',
  styleUrls: ['./editar-categoria.component.css']
})
export class EditarCategoriaComponent implements OnInit {

  isLoading: boolean = false;
  categoria: any = {};
  tipoEquipamento?: TipoEquipamento[] = [];

  constructor(
    private route: ActivatedRoute,
    private categoriaService: CategoriaService,
    private snackBar: MatSnackBar,
    private location: Location,
    private tipoEquipamentoService: TipoEquipamentoService
  ) {}

  ngOnInit(): void {
    this.isLoading = true;
    this.route.paramMap.subscribe(params => {
      const categoriaId = Number(params.get('id'));
      if (categoriaId) {
        this.categoriaService.BuscarCategoria(categoriaId).subscribe(
          (categoria: any) => {
            this.categoria = categoria;
            this.carregarTipo();
            this.isLoading = false;
          },
          error => {
            this.isLoading = false;
            console.error('Erro ao carregar categoria:', error);
            // Lidar com o erro, se necessário
          }
        );
      }
    });
    this.carregarTipo();
  }

  carregarTipo(): void {
    this.tipoEquipamentoService.getTipoEquipamento().subscribe((tipoEquipamento: any) => {
      this.tipoEquipamento = tipoEquipamento.results;
      this.isLoading = false;
    });
  }

  onSubmit(): void {
    this.categoriaService.atualizarCategoria(this.categoria.id, this.categoria).subscribe(
      () => {
        this.snackBar.open('Categoria atualizada com sucesso!', '', {
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

  adicionarTipoEquipamento(): void {
    // Adicione lógica para adicionar um novo tipo de equipamento
    // Se necessário
  }

  voltarParaCategorias(): void {
    this.location.back();
  }
}

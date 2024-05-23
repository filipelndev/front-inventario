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
            console.log('Categoria carregada:', categoria);
            this.categoria = categoria;
            this.categoria.tipo_equipamento = categoria.tipo_equipamento.map((tipo: any) => tipo.id);
            console.log('Tipo Equipamento IDs:', this.categoria.tipo_equipamento);
            this.carregarTipo();
          },
          error => {
            this.isLoading = false;
            console.error('Erro ao carregar categoria:', error);
          }
        );
      } else {
        this.isLoading = false;
      }
    });
  }

  carregarTipo(): void {
    this.tipoEquipamentoService.getTipoEquipamento().subscribe((tipoEquipamento: any) => {
      this.tipoEquipamento = tipoEquipamento.results;
      console.log('Tipos de Equipamento carregados:', this.tipoEquipamento);
      this.isLoading = false;
    });
  }

  onSubmit(): void {
    this.isLoading = true;
    this.categoriaService.atualizarCategoria(this.categoria.id, this.categoria).subscribe(
      () => {
        this.isLoading = false;
        this.snackBar.open('Categoria atualizada com sucesso!', '', {
          duration: 3000,
          horizontalPosition: 'right',
          verticalPosition: 'bottom',
        });
        this.location.back();
      },
      error => {
        this.isLoading = false;
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

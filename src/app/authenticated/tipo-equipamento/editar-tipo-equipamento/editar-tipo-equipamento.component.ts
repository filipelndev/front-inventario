import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { TipoEquipamento } from 'src/app/Models/TipoEquipamento';
import { TipoEquipamentoService } from '../../tipo-equipamento.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-editar-tipo-equipamento',
  templateUrl: './editar-tipo-equipamento.component.html',
  styleUrls: ['./editar-tipo-equipamento.component.css']
})
export class EditarTipoEquipamentoComponent implements OnInit {
  tipoEquipamento?: any;
  isLoading: boolean = false;

  constructor(
    private tipoEquipamentoService: TipoEquipamentoService,
    private snackBar: MatSnackBar,
    private route: ActivatedRoute,
    private router: Router,
    private location: Location
  ) { }

  ngOnInit(): void {
    const tipoEquipamentoId = Number(this.route.snapshot.paramMap.get('id'));
    if (tipoEquipamentoId) {
      this.carregarTipoEquipamento(tipoEquipamentoId);
    } else {
      console.error('ID do tipo de equipamento não fornecido.');
      // Redirecionar ou exibir uma mensagem de erro, conforme necessário
    }
  }

  carregarTipoEquipamento(id: number): void {
    this.isLoading = true;
    this.tipoEquipamentoService.obterDetalhesTipoEquipamento(id).subscribe(
      (tipoEquipamento: TipoEquipamento) => {
        this.tipoEquipamento = tipoEquipamento;
        this.isLoading = false;
      },
      (error) => {
        console.error('Erro ao carregar tipo de equipamento:', error);
        this.isLoading = false;
        // Exibir uma mensagem de erro, caso necessário
      }
    );
  }

  onSubmit() {
    const tipoEquipamentoId = this.tipoEquipamento.id;
    console.log('id: ', tipoEquipamentoId);
    console.log('equipamento', this.tipoEquipamento);
    if (tipoEquipamentoId !== undefined) {
      this.tipoEquipamentoService.atualizarTipoEquipamento(tipoEquipamentoId, this.tipoEquipamento)
        .subscribe(
          (tipoEquipamentoAtualizado) => {
            const mensagem = 'Tipo de equipamento atualizado com sucesso!';
            this.snackBar.open(mensagem, '', {
              duration: 3000,
              horizontalPosition: 'right',
              verticalPosition: 'bottom',
            });
            this.location.back();
          },
          (error) => {
            console.error('Erro ao atualizar o tipo de equipamento:', error);
            const errorMessage = 'Erro ao atualizar o tipo de equipamento. Por favor, tente novamente.';
            this.snackBar.open(errorMessage, '', {
              duration: 3000,
              horizontalPosition: 'right',
              verticalPosition: 'bottom',
            });
          }
        );
    } else {
      console.error('ID do tipo de equipamento é indefinido. Não é possível editar.');
      const errorMessage = 'Erro ao encontrar o tipo de equipamento. ID não existe ou é indefinido.';
      this.snackBar.open(errorMessage, '', {
        duration: 3000,
        horizontalPosition: 'right',
        verticalPosition: 'bottom',
      });
    }
  }

  voltarParaUsuarios(): void {
    this.location.back();
  }
}

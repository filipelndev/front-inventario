import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { TipoEquipamento } from 'src/app/Models/TipoEquipamento';
import { TipoEquipamentoService } from '../../tipo-equipamento.service';
import { MatPaginator } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-listar-tipo-equipamento',
  templateUrl: './listar-tipo-equipamento.component.html',
  styleUrls: ['./listar-tipo-equipamento.component.css']
})
export class ListarTipoEquipamentoComponent implements OnInit {
  displayedColumns: string[] = ['tipoEquipamento', 'status', 'editar'];
  dataSource = new MatTableDataSource<TipoEquipamento>([]);
  isLoading: boolean = false;


  constructor(private tipoequipamento: TipoEquipamentoService,
    private router: Router,
    private location: Location,
    private snackBar: MatSnackBar
    ) {}

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngOnInit() {
      this.isLoading = true;
    this.tipoequipamento.getTipoEquipamento().subscribe(
      (tipoEquipamento: any) => {
        this.isLoading = false;
        this.dataSource.data = tipoEquipamento.results;
        this.dataSource.paginator = this.paginator; // Configura o paginador
      },
      error => {
        this.snackBar.open(error.error, '', {
          duration: 5000,
          horizontalPosition: 'right',
          verticalPosition: 'bottom',
        });
        console.error('Erro ao obter itens:', error);
      }
    );
  }

  alterarStatusTipoEquipamento(tipoEquipamento: TipoEquipamento): void {
    if (tipoEquipamento.id !== undefined) {
      // Chame o método do serviço para alterar o status do tipo do equipamento
      this.tipoequipamento.alterarStatusTipoEquipamento(tipoEquipamento.id, !tipoEquipamento.status).subscribe(
        (tipoEquipamentoAtualizado) => {
          // Atualize o status no dataSource
          const index = this.dataSource.data.findIndex(c => c.id === tipoEquipamento.id);
          if (index !== -1) {
            this.dataSource.data[index].status = tipoEquipamentoAtualizado.status;
          }
        },
        (erro) => {
          console.error('Erro ao alterar o status do tipo do equipamento:', erro);
          // Adicione aqui a lógica para lidar com o erro, se necessário
        }
      );
    } else {
      console.error('ID do tipo do equipamento é indefinido. Não é possível alterar o status.');
      // Adicione aqui a lógica para lidar com o caso em que o ID é indefinido
    }
  }

  navegarDetalhesTipoEquipamento(tipoEquipamentoId: number): void {
    this.router.navigate(['/detalhe-tipo-equipamento', tipoEquipamentoId]);
  }

  editarTipoEquipamento(tipoEquipamento: TipoEquipamento): void {
    this.router.navigate(['/editar-tipo-equipamento', tipoEquipamento.id]);
  }

  voltarParaUsuarios(): void {
    this.location.back();
  }
}

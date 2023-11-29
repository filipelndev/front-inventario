import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { TipoEquipamento } from 'src/app/Models/TipoEquipamento';
import { TipoEquipamentoService } from '../../tipo-equipamento.service';

@Component({
  selector: 'app-listar-tipo-equipamento',
  templateUrl: './listar-tipo-equipamento.component.html',
  styleUrls: ['./listar-tipo-equipamento.component.css']
})
export class ListarTipoEquipamentoComponent implements OnInit {
  displayedColumns: string[] = ['tipoEquipamento', 'status'];
  dataSource = new MatTableDataSource<TipoEquipamento>([]);


  constructor(private dialog: MatDialog, private tipoequipamento: TipoEquipamentoService) {}

  ngOnInit() {
    this.tipoequipamento.getTipoEquipamento().subscribe(
      (tipoEquipamento: any) => {
        this.dataSource.data = tipoEquipamento.results;
        console.log('colaboradores', tipoEquipamento);
        console.log('data', this.dataSource.data);
      },
      error => {
        console.error('Erro ao obter colaboradores:', error);
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
}

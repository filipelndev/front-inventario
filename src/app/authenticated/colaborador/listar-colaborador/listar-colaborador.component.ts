import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { Colaborador } from 'src/app/Models/Colaborador';
import { MatDialog } from '@angular/material/dialog';
import { EditarColaboradorComponent } from '../editar-colaborador/editar-colaborador.component';
import { ColaboradorService } from '../../colaborador.service';
import { Observable } from 'rxjs/internal/Observable';

@Component({
  selector: 'app-listar-colaborador',
  templateUrl: './listar-colaborador.component.html',
  styleUrls: ['./listar-colaborador.component.css']
})
export class ListarColaboradorComponent implements OnInit {
  displayedColumns: string[] = ['nome', 'cpf', 'status', 'editar']; // Adicione mais colunas conforme necessário
  dataSource = new MatTableDataSource<Colaborador>([]);

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private dialog: MatDialog, private colaboradorService: ColaboradorService) {}

  ngOnInit() {
    this.colaboradorService.getColaboradores().subscribe(
      (colaboradores: any) => {
        this.dataSource.data = colaboradores.results;
      },
      error => {
        console.error('Erro ao obter colaboradores:', error);
      }
    );
  }

  ngAfterViewInit(){
    this.dataSource.paginator = this.paginator; // Configura o paginador
  }

  editarColaborador(colaborador: Colaborador): void {
    const dialogRef = this.dialog.open(EditarColaboradorComponent, {
      width: '1000px', // Ajuste o tamanho conforme necessário
      data: { colaborador },
    });

    dialogRef.afterClosed().subscribe((result) => {
      // Lógica a ser executada após o fechamento do diálogo de edição
      console.log('O diálogo foi fechado');
    });
  }

  alterarStatusColaborador(colaborador: Colaborador): void {
    if (colaborador.id !== undefined) {
      // Chame o método do serviço para alterar o status do colaborador
      this.colaboradorService.alterarStatusColaborador(colaborador.id, !colaborador.status).subscribe(
        (colaboradorAtualizado) => {
          // Atualize o status no dataSource
          const index = this.dataSource.data.findIndex(c => c.id === colaborador.id);
          if (index !== -1) {
            this.dataSource.data[index].status = colaboradorAtualizado.status;
          }
        },
        (erro) => {
          console.error('Erro ao alterar o status do colaborador:', erro);
          // Adicione aqui a lógica para lidar com o erro, se necessário
        }
      );
    } else {
      console.error('ID do colaborador é indefinido. Não é possível alterar o status.');
      // Adicione aqui a lógica para lidar com o caso em que o ID é indefinido
    }
  }
}

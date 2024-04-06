import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { Colaborador } from 'src/app/Models/Colaborador';
import { MatDialog } from '@angular/material/dialog';
import { EditarColaboradorComponent } from '../editar-colaborador/editar-colaborador.component';
import { ColaboradorService } from '../../colaborador.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-listar-colaborador',
  templateUrl: './listar-colaborador.component.html',
  styleUrls: ['./listar-colaborador.component.css']
})
export class ListarColaboradorComponent implements OnInit {
  isLoading: boolean = false;
  displayedColumns: string[] = ['nome', 'cpf', 'status', 'editar']; // Adicione mais colunas conforme necessário
  dataSource = new MatTableDataSource<Colaborador>([]);

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private dialog: MatDialog,
    private colaboradorService: ColaboradorService,
    private router: Router,
    private snackBar: MatSnackBar,) {}

  ngOnInit() {
    this.isLoading = true;
    this.colaboradorService.getColaboradores().subscribe(
      (colaboradores: any) => {
        this.dataSource.data = colaboradores.results;
        this.isLoading = false;
      },
      error => {
        this.snackBar.open(error.error, '', {
          duration: 5000,
          horizontalPosition: 'right',
          verticalPosition: 'bottom',
        });
        console.error('Erro ao obter colaboradores:', error);
      }
    );
  }

  ngAfterViewInit(){
    this.dataSource.paginator = this.paginator; // Configura o paginador
  }

  editarColaborador(colaborador: Colaborador): void {
    this.router.navigate(['/editar-colaborador', colaborador.id]);
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

  voltarParaUsuarios(): void {
    // Implemente a navegação de volta para a lista de usuários ou página desejada
    this.router.navigate(['/dashboard']);
  }
}

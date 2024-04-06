import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { CategoriaService } from '../../categoria.service';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-listar-categoria',
  templateUrl: './listar-categoria.component.html',
  styleUrls: ['./listar-categoria.component.css']
})
export class ListarCategoriaComponent implements OnInit {
  isLoading: boolean = false;
  displayedColumns: string[] = ['nome', 'descricao', 'status', 'editar']; // Adicione mais colunas conforme necessário
  dataSource = new MatTableDataSource<any>([]);

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private categoriaService: CategoriaService,
    private location: Location,
    private router: Router,
    private http: HttpClient,
    private snackBar: MatSnackBar) {}

  ngOnInit() {
    this.isLoading = true;
    this.categoriaService.ListarCategoria().subscribe(
      (categorias: any) => {
        this.dataSource.data = categorias.results;
        console.log(categorias.results);
        this.isLoading = false;
      },
      error => {
        this.snackBar.open(error.error, '', {
          duration: 5000,
          horizontalPosition: 'right',
          verticalPosition: 'bottom',
        });
        console.error('Erro ao obter categorias:', error);
      }
    );
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator; // Configura o paginador
  }

  editarCategoria(categoria: any): void {
    this.router.navigate(['/editar-categoria', categoria.id]);
  }

  alterarStatusCategoria(categoria: any): void {
    if (categoria.id !== undefined) {
      this.categoriaService.alterarStatusCategoria(categoria.id, !categoria.status).subscribe(
        (categoriaAtualizada) => {
          // Atualize o status no dataSource
          const index = this.dataSource.data.findIndex(c => c.id === categoria.id);
          if (index !== -1) {
            this.dataSource.data[index].status = categoriaAtualizada.status;
          }
        },
        (error) => {
          console.error('Erro ao alterar o status da categoria:', error);
          // Adicione aqui a lógica para lidar com o erro, se necessário
        }
      );
    } else {
      console.error('ID da categoria é indefinido. Não é possível alterar o status.');
      // Adicione aqui a lógica para lidar com o caso em que o ID é indefinido
    }
  }

  voltarParaUsuarios(): void {
    // Implemente a navegação de volta para a lista de usuários ou página desejada
    this.location.back();
  }
}

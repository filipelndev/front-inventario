import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { ItemService } from '../../item.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-listar-item',
  templateUrl: './listar-item.component.html',
  styleUrls: ['./listar-item.component.css']
})
export class ListarItemComponent  implements OnInit {
  isLoading: boolean = false;
  displayedColumns: string[] = ['nome', 'categoria', 'status' ,'editar'];
  dataSource = new MatTableDataSource<any>([]);

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private itemService: ItemService,
    private location: Location,
    private router: Router,
    private snackBar: MatSnackBar) {}

  ngOnInit() {
    this.isLoading = true;
    this.itemService.ListarItem().subscribe(
      (items: any) => {
        this.dataSource.data = items.results;
        console.log(items.results);
        this.isLoading = false;
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

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator; // Configura o paginador
  }

  editarItem(item: any): void {
    this.router.navigate(['/editar-item', item.id]);
  }

  alterarStatusItem(item: any): void {
    if (item.id !== undefined) {
      this.itemService.alterarStatusItem(item.id, !item.status).subscribe(
        (categoriaAtualizada) => {
          // Atualize o status no dataSource
          const index = this.dataSource.data.findIndex(c => c.id === item.id);
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

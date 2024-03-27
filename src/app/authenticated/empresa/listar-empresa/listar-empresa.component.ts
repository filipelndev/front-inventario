import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Empresa } from 'src/app/Models/Empresa';
import { MatDialog } from '@angular/material/dialog';
import { EditarEmpresaComponent } from '../editar-empresa/editar-empresa.component';
import { EmpresaService } from '../../empresa.service';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-listar-empresa',
  templateUrl: './listar-empresa.component.html',
  styleUrls: ['./listar-empresa.component.css']
})
export class ListarEmpresaComponent implements OnInit {
  isLoading: boolean = false;
  displayedColumns: string[] = ['nome', 'cnpj', 'status', 'editar'];
  dataSource = new MatTableDataSource<Empresa>([]);

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private dialog: MatDialog,
    private empresaService: EmpresaService,
    private router: Router,
    private location: Location) {}

  ngOnInit() {
    this.isLoading = true;
    this.empresaService.getEmpresas().subscribe(
      (empresas: any) => {
        this.dataSource.data = empresas.results;
        this.isLoading = false;
      },
      error => {
        this.isLoading = false;
        console.error('Erro ao obter colaboradores:', error);
      }
    );
  }

  ngAfterViewInit(){
    this.dataSource.paginator = this.paginator;
  }

  editarEmpresa(empresa: Empresa): void {
    this.router.navigate(['/editar-empresa', empresa.id]);
  }

  alterarStatusEmpresa(empresa: Empresa): void {
    if (empresa.id !== undefined) {
      // Chame o método do serviço para alterar o status do colaborador
      this.empresaService.alterarStatusEmpresa(empresa.id, !empresa.status).subscribe(
        (empresaAtualizada) => {
          // Atualize o status no dataSource
          const index = this.dataSource.data.findIndex(c => c.id === empresa.id);
          if (index !== -1) {
            this.dataSource.data[index].status = empresaAtualizada.status;
          }
        },
        (erro) => {
          console.error('Erro ao alterar o status da empresa:', erro);
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
    this.location.back();
  }

}


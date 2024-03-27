import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Setor } from 'src/app/Models/Setor';
import { EmpresaService } from 'src/app/authenticated/empresa.service';
import { SetorService } from '../setor.service';

@Component({
  selector: 'app-listar-setor',
  templateUrl: './listar-setor.component.html',
  styleUrls: ['./listar-setor.component.css']
})
export class ListarSetorComponent implements OnInit {

  isLoading: boolean = false;
  displayedColumns: string[] = ['nome', 'status', 'editar'];
  dataSource = new MatTableDataSource<Setor>([]);

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private setorService: SetorService,
    private router: Router) {}

  ngOnInit(): void {
    this.listarSetores();
  }

  listarSetores(): void {
    this.isLoading = true;
    this.setorService.listarSetores()
      .subscribe(
        (setores: any) => {
          this.isLoading = false;
          this.dataSource = setores.results;
          console.log(setores);
        },
        error => {
          console.error('Erro ao obter setores', error);
          this.isLoading = false;
          // Adicione aqui a lógica para lidar com o erro, se necessário
        }
      );
  }

  alterarStatusSetor(setor: Setor): void {
    if (setor.id !== undefined) {
      // Chame o método do serviço para alterar o status do colaborador
      this.setorService.alterarStatusSetor(setor.id, !setor.status).subscribe(
        (setorAtualizado) => {
          // Atualize o status no dataSource
          const index = this.dataSource.data.findIndex(c => c.id === setor.id);
          if (index !== -1) {
            this.dataSource.data[index].status = setorAtualizado.status;
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

  editarSetor(setor: any): void {
    // Extrair o ID do setor
  const setorId = setor.id;

  // Navegar para a página de edição com o ID do setor como parâmetro
  this.router.navigate(['/editar-setor', setorId]);
  }

  voltarParaUsuarios(): void {
    // Retorna para a página do dashboard
    this.router.navigate(['/dashboard']);
  }

}

import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Equipamento } from 'src/app/Models/Equipamento';
import { MatDialog } from '@angular/material/dialog';
import { EditarEquipamentosComponent } from '../editar-equipamentos/editar-equipamentos.component';
import { EquipamentoService } from '../../equipamento.service';
import { BuscaNomesService } from 'src/app/util/busca-nomes.service';
import { Colaborador } from 'src/app/Models/Colaborador';
import { Empresa } from 'src/app/Models/Empresa';
import { Observable, of } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-listar-equipamentos',
  templateUrl: './listar-equipamentos.component.html',
  styleUrls: ['./listar-equipamentos.component.css']
})
export class ListarEquipamentosComponent implements OnInit {
  displayedColumns: string[] = ['tagPatrimonio', 'tipoEquipamento','situacao', 'marca', 'modelo', 'empresa', 'colaborador', 'status', 'editar'];
  dataSource = new MatTableDataSource<Equipamento>([]);

  constructor(private dialog: MatDialog, private equipamentoService: EquipamentoService,
     private buscaNomesService: BuscaNomesService, private router: Router) {}

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngOnInit() {
    this.equipamentoService.getEquipamentos().subscribe(
      (equipamentos: any) => {
        this.dataSource.data = equipamentos.results;
        this.dataSource.paginator = this.paginator; // Configura o paginador
      });
  }

  abrirMenuPopup(equipamento: Equipamento): void {
    const dialogRef = this.dialog.open(EditarEquipamentosComponent, {
      width: '1000px', // Ajuste conforme necessário
      data: { equipamento }
    });

    dialogRef.afterClosed().subscribe(result => {

    });
  }

  alterarStatusEquipamento(equipamento: Equipamento): void {
    if (equipamento.id !== undefined) {
      // Chame o método do serviço para alterar o status do equipamento
      this.equipamentoService.alterarStatusEquipamento(equipamento.id, !equipamento.status).subscribe(
        (equipamentoAtualizado) => {
          // Atualize o status no dataSource
          const index = this.dataSource.data.findIndex(e => e.id === equipamento.id);
          if (index !== -1) {
            this.dataSource.data[index].status = equipamentoAtualizado.status;
          }
        },
        (erro) => {
          console.error('Erro ao alterar o status do equipamento:', erro);
          // Adicione aqui a lógica para lidar com o erro, se necessário
        }
      );
    } else {
      console.error('ID do equipamento é indefinido. Não é possível alterar o status.');
      // Adicione aqui a lógica para lidar com o caso em que o ID é indefinido
    }
  }

  getDescricaoSituacao(situacao: string): string {
    switch (situacao) {
      case '0':
        return 'Novo';
      case '1':
        return 'Em operação';
      case '2':
        return 'Em manutenção';
      case '3':
        return 'Disponível';
      case '4':
        return 'Indisponível';
      default:
        return 'Desconhecido';
    }
  }

   buscarEquipamento(): void {
    this.router.navigate(['/buscar-equipamento']);
  }

  voltarParaUsuarios(): void {
    // Implemente a navegação de volta para a lista de usuários ou página desejada
    this.router.navigate(['/dashboard']);
  }

  irParaTransferencia(equipamento: any): void {
    if(equipamento.id != null)
    {
      console.log(equipamento.id);
    var empresaId = equipamento.empresa;
    console.log(empresaId);
      // Navega para a tela de transferência, passando o ID da empresa como parâmetro
    this.router.navigate(['/transfere-empresa'], { queryParams: { empresaId: empresaId } });
    }
  }

  irParaTransferenciaDeSituacao(equipamentoId: number): void {
    // Navegar para a tela de transferência com parâmetros
    this.router.navigate(['/altera-situacao'], { queryParams: { equipamentoId: equipamentoId } });
  }

  navegarDetalhesTipoEquipamento(tipoEquipamentoId: number): void {
    this.router.navigate(['/detalhe-tipo-equipamento', tipoEquipamentoId]);
  }

  navegarDetalhesColaborador(colaboradorId: number): void {
    this.router.navigate(['/detalhe-colaborador', colaboradorId]);
  }

  navegarDetalhesEmpresa(empresaId: number): void {
    this.router.navigate(['/detalhes-empresa', empresaId]);
  }
}

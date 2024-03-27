import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { EquipamentoService } from '../../equipamento.service';
import { MatPaginator } from '@angular/material/paginator';
import { Location } from '@angular/common';

@Component({
  selector: 'app-detalhe-equipamento',
  templateUrl: './detalhe-equipamento.component.html',
  styleUrls: ['./detalhe-equipamento.component.css']
})
export class DetalheEquipamentoComponent implements OnInit {

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  isLoading: boolean = false;
  equipamentoId: number | undefined;
  equipamento: any;
  historico: any[] = [];
  paginatedHistorico: any[] = [];
  historicoColumns: string[] = ['data_transferencia', 'empresa_origem', 'empresa_destino', 'usuario_transferencia'];
  username: any[] = [];

  pageSizeOptions: number[] = [5]; // Opções de tamanho de página disponíveis
  pageSize: number = this.pageSizeOptions[0]; // Tamanho de página padrão

  constructor(private route: ActivatedRoute,
    private equipamentoService: EquipamentoService,
    private router: Router,
    private location: Location) {}

  ngOnInit(): void {
    this.isLoading = true;
    this.route.paramMap.subscribe(params => {
      this.equipamentoId = Number(params.get('id'));
      if (this.equipamentoId) {
        this.obterDetalhesEquipamento();
        this.obterHistoricoEquipamento();
      }
    });
  }

  obterDetalhesEquipamento(): void {
    this.equipamentoService.getEquipamentoForId(this.equipamentoId!)
      .subscribe(
        (equipamento: any) => {
          this.equipamento = equipamento;
          console.log(equipamento);
        },
        error => {
          console.error('Erro ao obter detalhes do equipamento:', error);
          // Adicione aqui a lógica para lidar com o erro, se necessário
        }
      );
  }

  obterHistoricoEquipamento(): void {
    this.equipamentoService.getHistoricoEquipamento(this.equipamentoId!)
    .subscribe(
      (historico: any) => {
        this.historico = historico.historico;
        this.isLoading = false;
        this.atualizarPaginacao(0); // Inicializa a primeira página do paginador
      },
      error => {
        this.isLoading = false;
        console.error('Erro ao obter histórico do equipamento', error);
      }
    );
  }

  voltarParaUsuarios(): void {
    // Implemente a navegação de volta para a lista de usuários ou página desejada
    this.location.back();
  }

  irParaTransferenciaDeEmpresa(): void {
    // Navegar para a tela de transferência com parâmetros
    this.router.navigate(['/transfere-empresa'], { queryParams: { equipamentoId: this.equipamentoId } });
  }

  irParaTransferenciaDeColaborador(): void {
    // Navegar para a tela de transferência com parâmetros
    this.router.navigate(['/transfere-colaborador'], { queryParams: { equipamentoId: this.equipamentoId } });
  }

  irParaTransferenciaDeSituacao(): void {
    // Navegar para a tela de transferência com parâmetros
    this.router.navigate(['/altera-situacao'], { queryParams: { equipamentoId: this.equipamentoId } });
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

  onPageChange(event: any): void {
    this.atualizarPaginacao(event.pageIndex);
  }

  onPageSizeChange(event: any): void {
    this.pageSize = event.pageSize;
    this.atualizarPaginacao(0); // Retorna para a primeira página ao alterar o tamanho da página
  }

  atualizarPaginacao(pageIndex: number): void {
    const startIndex = pageIndex * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.paginatedHistorico = this.historico.slice(startIndex, endIndex);
  }
}

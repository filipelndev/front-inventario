import { Component, OnInit, ViewChild } from '@angular/core';
import { MovimentacaoService } from '../../movimentacao.service';
import { Location } from '@angular/common';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { FormGroup, FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-listar-movimentacao',
  templateUrl: './listar-movimentacao.component.html',
  styleUrls: ['./listar-movimentacao.component.css']
})
export class ListarMovimentacaoComponent implements OnInit {
  dataSource = new MatTableDataSource<any>([]);
  displayedColumns: string[] = ['data', 'quantidade', 'numeroDocumento', 'tipoMovimentacao', 'actions'];

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  range = new FormGroup({
    start: new FormControl<Date | null>(null),
    end: new FormControl<Date | null>(null),
  });

  movimentacao: any;
  itemId: any;

  constructor(
    private movimentacaoService: MovimentacaoService,
    private location: Location,
    private route: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    this.obterIdItemERecarregarMovimentacoes();
  }
  
  obterIdItemERecarregarMovimentacoes(): void {
    this.route.paramMap.subscribe(params => {
      const itemId = Number(params.get('id'));
      console.log(itemId);
      if (itemId) {
        this.itemId = itemId;
        console.log(this.itemId);
        this.carregarMovimentacoesEstoque();
      }
    });
  }

  carregarMovimentacoesEstoque(): void {
    this.route.paramMap.subscribe(params => {
      const itemId = Number(params.get('id'));
      console.log(itemId);
      if (itemId) {
        this.movimentacaoService.getMovimentacoesEstoque(itemId).subscribe(
          movimentacoes => {
            this.movimentacao = movimentacoes;
            this.dataSource.data = this.movimentacao;
            this.dataSource.paginator = this.paginator;
          },
          error => {
            console.error('Erro ao carregar movimentações de estoque:', error);
            // Lidar com o erro, se necessário
          }
        );
      }
    });
  }

  onDelete(id: number): void {
    this.movimentacaoService.deletarMovimentacaoEstoque(id).subscribe(
      () => {
        // Recarregar as movimentações após a exclusão bem-sucedida
        this.carregarMovimentacoesEstoque();
      },
      error => {
        console.error('Erro ao deletar movimentação de estoque:', error);
        // Lidar com o erro, se necessário
      }
    );
  }

  voltar(): void {
    this.location.back();
  }

  buscarMovimentacoes(): void {
    const dataInicial: string | undefined = this.range.value.start ? this.formatarData(this.range.value.start) : undefined;
    const dataFinal: string | undefined = this.range.value.end ? this.formatarData(this.range.value.end) : undefined;
    
    this.dataSource.data = []; // Limpa a lista de movimentações antes de buscar novos dados
  
    this.movimentacaoService.getMovimentacoesEstoque(this.itemId, dataInicial, dataFinal).subscribe(
      movimentacoes => {
        this.dataSource.data = movimentacoes; // Atualiza os dados diretamente no dataSource
        this.atualizarMovimentacoes(); // Atualiza a paginação e ordenação
      },
      error => {
        console.error('Erro ao buscar movimentações de estoque com filtro de data:', error);
        // Lidar com o erro, se necessário
      }
    );
  }

  resetDateFilter(): void {
    this.range.reset();
    this.carregarMovimentacoesEstoque(); // Recarregar movimentações sem filtro de data
  }

  formatarData(data: Date): string {
    return data.toISOString().slice(0, 10);
  }

  atualizarMovimentacoes(): void {
    this.dataSource.paginator = this.paginator;
  }
}

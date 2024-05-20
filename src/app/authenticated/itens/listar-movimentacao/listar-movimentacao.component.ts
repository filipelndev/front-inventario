import { Component, OnInit, ViewChild } from '@angular/core';
import { MovimentacaoService } from '../../movimentacao.service';
import { Location } from '@angular/common';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { FormGroup, FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { debounceTime } from 'rxjs/operators';
import { ItemService } from '../../item.service';
import { MatSnackBar } from '@angular/material/snack-bar';

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
  item: any;
  itemId: any;
  isLoading = false;

  constructor(
    private movimentacaoService: MovimentacaoService,
    private location: Location,
    private route: ActivatedRoute,
    private itemService: ItemService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.obterIdItemERecarregarMovimentacoes();
    this.range.valueChanges.pipe(debounceTime(300)).subscribe(() => {
      this.buscarMovimentacoes();
    });
  }
  
  obterIdItemERecarregarMovimentacoes(): void {
    this.route.paramMap.subscribe(params => {
      const itemId = Number(params.get('id'));
      if (itemId) {
        this.itemId = itemId;
        this.carregarMovimentacoesEstoque();
        this.itemService.BuscarItem(itemId).subscribe(
          item => {
            this.item = item;
          },
          error => {
            this.snackBar.open('Erro ao obter item', 'Fechar', { duration: 3000 });
            console.error('Erro ao obter item', error);
          }
        );
      }
    });
  }

  carregarMovimentacoesEstoque(): void {
    this.isLoading = true;
    this.movimentacaoService.getMovimentacoesEstoque(this.itemId).subscribe(
      movimentacoes => {
        this.movimentacao = movimentacoes;
        this.dataSource.data = this.movimentacao;
        this.dataSource.paginator = this.paginator; // Atualização do paginator
        this.isLoading = false;
      },
      error => {
        this.snackBar.open('Erro ao carregar movimentações de estoque', 'Fechar', { duration: 3000 });
        console.error('Erro ao carregar movimentações de estoque:', error);
        this.isLoading = false;
      }
    );
  }

  onDelete(id: number): void {
    if (confirm('Tem certeza que deseja remover esta movimentação?')) {
      this.movimentacaoService.deletarMovimentacaoEstoque(id).subscribe(
        () => {
          this.carregarMovimentacoesEstoque();
          this.snackBar.open('Movimentação removida com sucesso', 'Fechar', { duration: 3000 });
        },
        error => {
          this.snackBar.open('Erro ao deletar movimentação de estoque', 'Fechar', { duration: 3000 });
          console.error('Erro ao deletar movimentação de estoque:', error);
        }
      );
    }
  }

  voltar(): void {
    this.location.back();
  }

  buscarMovimentacoes(): void {
    const dataInicial: string | undefined = this.range.value.start ? this.formatarData(this.range.value.start) : undefined;
    const dataFinal: string | undefined = this.range.value.end ? this.formatarData(this.range.value.end) : undefined;

    this.dataSource.data = [];
  
    this.movimentacaoService.getMovimentacoesEstoque(this.itemId, dataInicial, dataFinal).subscribe(
      movimentacoes => {
        this.dataSource.data = movimentacoes;
        this.dataSource.paginator = this.paginator; // Atualização do paginator
      },
      error => {
        this.snackBar.open('Erro ao buscar movimentações de estoque com filtro de data', 'Fechar', { duration: 3000 });
        console.error('Erro ao buscar movimentações de estoque com filtro de data:', error);
      }
    );
  }

  resetDateFilter(): void {
    this.range.reset();
    this.carregarMovimentacoesEstoque();
  }

  formatarData(data: Date): string {
    return data.toISOString().slice(0, 10);
  }
}

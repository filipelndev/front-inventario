import { Component, OnInit, ViewChild } from '@angular/core';
import { MovimentacaoService } from '../../movimentacao.service';
import { Location } from '@angular/common';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

@Component({
  selector: 'app-listar-movimentacao',
  templateUrl: './listar-movimentacao.component.html',
  styleUrls: ['./listar-movimentacao.component.css']
})
export class ListarMovimentacaoComponent implements OnInit {
  dataSource = new MatTableDataSource<any>([]);
  displayedColumns: string[] = ['data', 'quantidade', 'numeroDocumento', 'tipoMovimentacao', 'actions'];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  dateFilterInicial: FormControl = new FormControl();
  dateFilterFinal: FormControl = new FormControl();

  movimentacao: any;

  itemId: any; 
  

  constructor(
    private movimentacaoService: MovimentacaoService,
    private location: Location,
    private route: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    this.iniciarObservaveis();
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

  iniciarObservaveis(): void {
    // Observa mudanças no filtro de data inicial
    this.dateFilterInicial.valueChanges.pipe(
      debounceTime(300), // aguarda 300ms de pausa entre as digitações
      distinctUntilChanged() // evita chamadas desnecessárias
    ).subscribe((value) => {
      console.log("Data Inicial alterada:", value);
      this.buscarMovimentacoes();
    });

    // Observa mudanças no filtro de data final
    this.dateFilterFinal.valueChanges.pipe(
      debounceTime(300), // aguarda 300ms de pausa entre as digitações
      distinctUntilChanged() // evita chamadas desnecessárias
    ).subscribe((value) => {
      console.log("Data Final alterada:", value);
      this.buscarMovimentacoes();
    });
  }

  carregarMovimentacoesEstoque(): void {
    this.movimentacaoService.getMovimentacoesEstoque(this.itemId).subscribe(
      movimentacoes => {
        this.movimentacao = movimentacoes;
        this.dataSource.data = this.movimentacao;
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      error => {
        console.error('Erro ao carregar movimentações de estoque:', error);
        // Lidar com o erro, se necessário
      }
    );
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
    const dataInicial: string | undefined = this.dateFilterInicial.value ? this.formatarData(this.dateFilterInicial.value) : undefined;
    const dataFinal: string | undefined = this.dateFilterFinal.value ? this.formatarData(this.dateFilterFinal.value) : undefined;

    this.movimentacaoService.getMovimentacoesEstoque(this.itemId, dataInicial, dataFinal).subscribe(
      movimentacoes => {
        this.movimentacao = movimentacoes;
        this.dataSource.data = this.movimentacao;
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      error => {
        console.error('Erro ao buscar movimentações de estoque com filtro de data:', error);
        // Lidar com o erro, se necessário
      }
    );
  }

  resetDateFilter(): void {
    this.dateFilterInicial.reset();
    this.dateFilterFinal.reset();
    this.carregarMovimentacoesEstoque(); // Recarregar movimentações sem filtro de data
  }

  formatarData(data: Date): string {
    return data.toISOString().slice(0, 10);
  }
}

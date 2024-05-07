import { Component, OnInit, ViewChild } from '@angular/core';
import { MovimentacaoService } from '../../movimentacao.service';
import { Location } from '@angular/common';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { FormControl } from '@angular/forms';
import { ItemService } from '../../item.service';

@Component({
  selector: 'app-listar-movimentacao',
  templateUrl: './listar-movimentacao.component.html',
  styleUrls: ['./listar-movimentacao.component.css']
})
export class ListarMovimentacaoComponent implements OnInit {
  dataSource = new MatTableDataSource<any>([]);
  displayedColumns: string[] = ['data', 'quantidade', 'numeroDocumento', 'tipoMovimentacao', 'itemId', 'actions'];
  filtro: FormControl = new FormControl('');

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private movimentacaoService: MovimentacaoService,
    private location: Location,
    private itemService: ItemService,
  ) {}

  ngOnInit(): void {
    this.carregarMovimentacoesEstoque();
  }

  carregarMovimentacoesEstoque(): void {
    this.movimentacaoService.getMovimentacoesEstoque().subscribe(
      movimentacoes => {
        this.dataSource = new MatTableDataSource(movimentacoes.results);
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

  applyFilter(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    const filterValue = inputElement.value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  buscarItem(id: number): any {
    this.itemService.BuscarItem(id).subscribe(
      item => {
        return item.nome;
    });
  }
}

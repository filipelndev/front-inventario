import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ItemService } from '../../item.service';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-listar-movimentacao-item',
  templateUrl: './listar-movimentacao-item.component.html',
  styleUrls: ['./listar-movimentacao-item.component.css']
})
export class ListarMovimentacaoItemComponent  implements OnInit {
  dataSource = new MatTableDataSource<any>([]);
  displayedColumns: string[] = ['id', 'nome', 'quantidade', 'status', 'actions' ];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private itemService: ItemService,
    private router: Router,
    private location: Location,
  ) {}

  ngOnInit(): void {
    this.carregarItens();
  }

  carregarItens(): void {
    this.itemService.ListarItem().subscribe(
      itens => {
        this.dataSource = itens.results;
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      error => {
        console.error('Erro ao carregar itens:', error);
        // Lidar com o erro, se necessário
      }
    );
  }

  voltar(): void {
    this.location.back();
  }

  irParaListaDeMovimentacao(movimentacaoid: number): void {
    console.log(movimentacaoid);
    // Redireciona para a rota da lista de movimentações com o ID do item como parâmetro
    this.router.navigate(['/listar-movimentacao', movimentacaoid]);
  }
}
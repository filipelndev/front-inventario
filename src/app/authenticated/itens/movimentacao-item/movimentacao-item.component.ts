import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MovimentacaoService } from '../../movimentacao.service';
import { ItemService } from '../../item.service';
import { DatePipe, Location } from '@angular/common';
import { Router } from '@angular/router';
import { Movimentacao } from 'src/app/Models/Movimentacao';
@Component({
  selector: 'app-movimentacao-item',
  templateUrl: './movimentacao-item.component.html',
  styleUrls: ['./movimentacao-item.component.css']
})
export class MovimentacaoItemComponent implements OnInit {
  itens: any[] = [];

  movimentacao: Movimentacao = {
    data: new Date(),
    quantidade: 0,
    item: 0,
    documento: '',
    tipo: 0
  }

  constructor(
    private movimentacaoService: MovimentacaoService,
    private itemService: ItemService,
    private location: Location,
    private router: Router,
    private datePipe: DatePipe,
  ) {}

  ngOnInit(): void {
    this.carregarItens();
  }

  carregarItens(): void {
    this.itemService.ListarItem().subscribe(
      itens => {
        this.itens = itens.results;
        console.log(this.itens);
      },
      error => {
        console.error('Erro ao listar itens', error);
      }
    )
  }

  onSubmit(): void {
    const dataFormatada = this.formatarData(this.movimentacao.data);
    const movimentacaoToSend: any = {
      data_movimento: dataFormatada,
      quantidade: this.movimentacao.quantidade.toString(),
      item: this.movimentacao.item.toString(),
      tipo: this.movimentacao.tipo.toString(),
      documento: this.movimentacao.documento
    }


    console.log(movimentacaoToSend);

    if (movimentacaoToSend != null && this.movimentacao.quantidade > 0) {

      this.movimentacaoService.criarMovimentacaoEstoque(movimentacaoToSend).subscribe(
        () => {
          // Limpar o formulário após a criação bem-sucedida
          console.log("alteração feita com sucesso");
        },
        error => {
          console.error('Erro ao criar movimentação de estoque:', error);
          // Lidar com o erro, se necessário
        }
      );
    }
    else
    {
      console.log("Formulário inválido");
    }
  }

  voltarParaCategorias(): void {
    this.location.back();
  }

  irParaListaDeMovimentacao(): void {
    this.router.navigate(['/listar-movimentacao'])
  }

  formatarData(data: Date): string {
    return this.datePipe.transform(data, 'YYYY-MM-dd') || '';
  }
}

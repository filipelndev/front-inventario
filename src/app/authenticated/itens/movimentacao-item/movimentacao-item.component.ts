import { Component, OnInit } from '@angular/core';
import { MovimentacaoService } from '../../movimentacao.service';
import { ItemService } from '../../item.service';
import { DatePipe, Location } from '@angular/common';
import { Movimentacao } from 'src/app/Models/Movimentacao';
import { MatSnackBar } from '@angular/material/snack-bar';

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
    private datePipe: DatePipe,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.carregarItens();
  }

  carregarItens(): void {
    this.itemService.ListarItem().subscribe(
      itens => {
        this.itens = itens.results;
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
          this.openSnackBar('Movimentação de estoque criada com sucesso!', 'Fechar');
        },
        error => {
          console.error('Erro ao criar movimentação de estoque:', error);
          // Lidar com o erro, se necessário
          this.openSnackBar('Erro ao criar movimentação de estoque. Por favor, tente novamente.', 'Fechar');
        }
      );
    } else {
      console.log("Formulário inválido");
    }
  }
  
  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 5000,
    });
  }
  voltarParaCategorias(): void {
    this.location.back();
  }

  formatarData(data: Date): string {
    return this.datePipe.transform(data, 'yyyy-MM-dd') || '';
  }

  atualizarData(event: any): void {
    this.movimentacao.data = event.value;
  }
}

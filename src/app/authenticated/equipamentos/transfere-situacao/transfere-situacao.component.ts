import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EquipamentoService } from '../../equipamento.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-transfere-situacao',
  templateUrl: './transfere-situacao.component.html',
  styleUrls: ['./transfere-situacao.component.css']
})
export class TransfereSituacaoComponent {
  isLoading: boolean = false;
  equipamentoId: number | undefined;
  equipamento: any;
  situacaoAtual?: number;
  novaSituacao?: number;
  situacoes: string[] = ['0', '1', '2', '3', '4'];

  constructor(private route: ActivatedRoute,
    private router:Router,
    private equipamentoService: EquipamentoService,
    private location: Location) {}

  ngOnInit(): void {
    // Recuperar o ID do equipamento da rota
    this.route.queryParams.subscribe(params => {
      this.equipamentoId = params['equipamentoId'];
      if (this.equipamentoId) {
        // Obter os detalhes do equipamento com base no ID
        this.obterDetalhesEquipamento(this.equipamentoId);
      }
    });
  }

  obterDetalhesEquipamento(equipamentoId: number): void {
    this.isLoading = true;
    this.equipamentoService.getEquipamentoForId(equipamentoId)
      .subscribe(
        (equipamento: any) => {
          this.equipamento = equipamento;
          this.isLoading = false;
        },
        error => {
          this.isLoading = false;
          console.error('Erro ao obter detalhes do equipamento:', error);
          // Adicione aqui a lógica para lidar com o erro, se necessário
        }
      );
  }

  obterDetalhesColaborador(colaboradorId: number): void {
    this.situacaoAtual = this.equipamento.situacao;
  }

  voltarParaDetalhesEquipamento(): void {
    this.location.back();
  }

  transferirEquipamento(): void {

    if (!this.novaSituacao) {
      console.error('Por favor, selecione uma nova situação para alterar no equipamento.');
      return;
    }

    if (this.equipamentoId && this.novaSituacao) {

      if(this.novaSituacao != undefined)
      {
        this.equipamentoService.AlterarSituacao(this.equipamentoId, this.novaSituacao)
        .subscribe(
          () => {
            console.log(`Equipamento ${this.equipamentoId} Situação alterada para ${this.novaSituacao} com sucesso!`);
            this.router.navigate([`listar-equipamento`]);
          },
          error => {
            console.error('Erro ao alterar a situação do equipamento:', error);
            // Adicione aqui a lógica para lidar com o erro, se necessário
          }
        );
      }

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
}

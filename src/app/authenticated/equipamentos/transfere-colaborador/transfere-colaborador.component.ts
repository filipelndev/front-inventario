import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EquipamentoService } from '../../equipamento.service';
import { ColaboradorService } from '../../colaborador.service';

@Component({
  selector: 'app-transfere-colaborador',
  templateUrl: './transfere-colaborador.component.html',
  styleUrls: ['./transfere-colaborador.component.css']
})
export class TransfereColaboradorComponent implements OnInit{
  isLoading: boolean = false;
  equipamentoId: number | undefined;
  equipamento: any;
  colaboradores: any[] = []
  colaboradorSelecionado?: any;

  constructor(private route: ActivatedRoute,
    private router:Router,
    private equipamentoService: EquipamentoService,
    private colaboradorService: ColaboradorService) {}

  ngOnInit(): void {
    // Recuperar o ID do equipamento da rota
    this.route.queryParams.subscribe(params => {
      this.equipamentoId = params['equipamentoId'];
      if (this.equipamentoId) {
        this.isLoading = true;
        // Obter os detalhes do equipamento com base no ID
        this.obterDetalhesEquipamento(this.equipamentoId);
        this.obterListaColaboradores();
      }
    });
  }

  obterDetalhesEquipamento(equipamentoId: number): void {
    if(this.equipamentoId != undefined)
    {
    this.equipamentoService.getEquipamentoForId(this.equipamentoId)
      .subscribe(
        (equipamento: any) => {
          this.equipamento = equipamento;
        },
        error => {
          console.error('Erro ao obter detalhes do equipamento:', error);
          // Adicione aqui a lógica para lidar com o erro, se necessário
        }
      );
    }
  }

  obterListaColaboradores(): void {
    this.colaboradorService.getColaboradores()
      .subscribe(
        (Colaboradores: any) => {
          this.colaboradores = Colaboradores.results;
          this.isLoading = false;
        },
        error => {
          this.isLoading = false;
          console.error('Erro ao obter lista de empresas:', error);
        }
      );
  }

  obterDetalhesColaborador(colaboradorId: number): void {
    this.colaboradorService.getColaboradorPorId(colaboradorId)
      .subscribe(
        (colaboradores: any) => {
          this.colaboradores = colaboradores.results;
        },
        error => {
          console.error('Erro ao obter detalhes da empresa:', error);
          // Adicione aqui a lógica para lidar com o erro, se necessário
        }
      );
  }

  voltarParaDetalhesEquipamento(): void {
    this.router.navigate(['/listar-equipamento'])
  }

  transferirEquipamento(): void {

    if (!this.colaboradorSelecionado) {
      console.error('Por favor, selecione um novo colaborador para transferir o equipamento.');
      return;
    }

    if (this.equipamentoId && this.colaboradorSelecionado) {

      if(this.colaboradorSelecionado != undefined)
      {
        this.equipamentoService.transferirEquipamentoParaColaborador(this.equipamentoId, this.colaboradorSelecionado)
        .subscribe(
          () => {
            console.log(`Equipamento ${this.equipamentoId} transferido com sucesso para o colaborador ${this.colaboradorSelecionado}`);
            this.router.navigate([`listar-equipamento`]);
          },
          error => {
            console.error('Erro ao transferir o equipamento:', error);
            // Adicione aqui a lógica para lidar com o erro, se necessário
          }
        );
      }

    }
  }
}

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EquipamentoService } from '../../equipamento.service';
import { EmpresaService } from '../../empresa.service';
import { Empresa } from 'src/app/Models/Empresa';

@Component({
  selector: 'app-transfere-empresa',
  templateUrl: './transfere-empresa.component.html',
  styleUrls: ['./transfere-empresa.component.css']
})
export class TransfereEmpresaComponent implements OnInit {
  isLoading: boolean = false;
  equipamentoId: number | undefined;
  equipamento: any;
  empresas: any[] = []
  empresaSelecionada?: any;

  constructor(private route: ActivatedRoute,
    private router:Router,
    private equipamentoService: EquipamentoService,
    private empresaService: EmpresaService) {}

  ngOnInit(): void {
    // Recuperar o ID do equipamento da rota
    this.route.queryParams.subscribe(params => {
      this.equipamentoId = params['equipamentoId'];
      if (this.equipamentoId) {
        this.isLoading = true;
        // Obter os detalhes do equipamento com base no ID
        this.obterDetalhesEquipamento(this.equipamentoId);
        this.obterListaEmpresas();
      }
    });
  }

  obterDetalhesEquipamento(equipamentoId: number): void {
    this.equipamentoService.getEquipamentoForId(equipamentoId)
      .subscribe(
        (equipamento: any) => {
          this.equipamento = equipamento.equipamento;
        },
        error => {
          console.error('Erro ao obter detalhes do equipamento:', error);
          // Adicione aqui a lógica para lidar com o erro, se necessário
        }
      );
  }

  obterListaEmpresas(): void {
    this.empresaService.getEmpresas()
      .subscribe(
        (empresas: any) => {
          this.empresas = empresas.results;
          this.isLoading = false;
        },
        error => {
          this.isLoading = false;
          console.error('Erro ao obter lista de empresas:', error);
        }
      );
  }

  obterDetalhesEmpresa(empresaId: number): void {
    this.empresaService.getEmpresaPorId(empresaId)
      .subscribe(
        (empresa: any) => {
          this.empresas = empresa.results;
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

    if (!this.empresaSelecionada) {
      console.error('Por favor, selecione uma nova empresa para transferir o equipamento.');
      return;
    }

    if (this.equipamentoId && this.empresaSelecionada) {

      if(this.empresaSelecionada != undefined)
      {
        this.equipamentoService.transferirEquipamentoParaEmpresa(this.equipamentoId, this.empresaSelecionada)
        .subscribe(
          () => {
            console.log(`Equipamento ${this.equipamentoId} transferido com sucesso para a empresa ${this.empresaSelecionada}`);
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

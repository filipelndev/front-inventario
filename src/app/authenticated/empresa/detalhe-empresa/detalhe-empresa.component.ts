import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Empresa } from 'src/app/Models/Empresa';
import { Equipamento } from 'src/app/Models/Equipamento';
import { EmpresaService } from '../../empresa.service';

@Component({
  selector: 'app-detalhe-empresa',
  templateUrl: './detalhe-empresa.component.html',
  styleUrls: ['./detalhe-empresa.component.css']
})
export class DetalheEmpresaComponent implements OnInit {
  empresaId: number | undefined;
  empresa: Empresa | undefined;
  equipamentos: Equipamento[] = [];

  constructor(private route: ActivatedRoute, private empresaService: EmpresaService) {}

  ngOnInit(): void {
    // Subscreve o evento de alteração de parâmetros na rota
    this.route.paramMap.subscribe(params => {
      // Obtém o ID da empresa a partir dos parâmetros da rota
      this.empresaId = Number(params.get('id'));

      // Carrega os detalhes da empresa com base no ID
      if (this.empresaId) {
        this.carregarDetalhesEmpresa();
        this.equipamentos = this.obterEquipamentosPorEmpresa(this.empresaId);
      }
    });
  }

  carregarDetalhesEmpresa(): void {
    if (this.empresaId) {
      this.empresaService.getDetalhesEmpresa(this.empresaId).subscribe(
        (empresa) => {
          this.empresa = empresa;
          console.log('Detalhes da empresa:', empresa);
        },
        (error) => {
          console.error('Erro ao obter detalhes da empresa:', error);
          // Adicione aqui a lógica para lidar com o erro, se necessário
        }
      );
    }
  }

  // Método fictício para obter equipamentos por empresa (substitua com sua lógica real)
  obterEquipamentosPorEmpresa(id: number): any[] {
    return [
      { tag_patrimonio: 'TAG001', tipoEquipamento: 'Computador', situacao: 'Em Operação' },
      { tag_patrimonio: 'TAG002', tipoEquipamento: 'Impressora', situacao: 'Novo' },
      // Adicione mais equipamentos conforme necessário
    ];
  }

  get nomeEmpresa(): string | undefined {
    return this.empresa?.nome;
  }

  // Adiciona um getter para o CNPJ da empresa
  get cnpjEmpresa(): string | undefined {
    return this.empresa?.cnpj;
  }
}

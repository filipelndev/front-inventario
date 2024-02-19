import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Empresa } from 'src/app/Models/Empresa';
import { Equipamento } from 'src/app/Models/Equipamento';
import { EmpresaService } from '../../empresa.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { Location } from '@angular/common';

@Component({
  selector: 'app-detalhe-empresa',
  templateUrl: './detalhe-empresa.component.html',
  styleUrls: ['./detalhe-empresa.component.css']
})
export class DetalheEmpresaComponent implements OnInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  empresaId: number | undefined;
  empresa: Empresa | undefined = { nome: '', cnpj: '', status: false, equipamentos: [] }; // Inicialize equipamentos como um array vazio
  equipamentos: Equipamento[] = [];
  dataSource = new MatTableDataSource<Equipamento>(this.equipamentos);
  displayedColumns: string[] = ['tagPatrimonio', 'tipoEquipamento', 'marca', 'modelo', 'situacao', 'colaborador',];


  constructor(private route: ActivatedRoute,
    private empresaService: EmpresaService,
    private router: Router,
    private location: Location) {}

  ngOnInit(): void {
    // Subscreve o evento de alteração de parâmetros na rota
    this.route.paramMap.subscribe(params => {
      // Obtém o ID da empresa a partir dos parâmetros da rota
      this.empresaId = Number(params.get('id'));

      // Carrega os detalhes da empresa com base no ID
      if (this.empresaId) {
        this.carregarDetalhesEmpresa();
        this.carregarEquipamentosDaEmpresa(this.empresaId);
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

  carregarEquipamentosDaEmpresa(idEmpresa: number): void {
    this.empresaService.getEquipamentosDaEmpresa(idEmpresa)
      .subscribe(
        (equipamentos: any) => {
          this.equipamentos = equipamentos.results;
          this.dataSource.data = equipamentos.results;
          this.dataSource.paginator = this.paginator;
          console.log(this.equipamentos);
        },
        error => {
          console.error('Erro ao carregar equipamentos da empresa:', error);
        }
      );
  }

  navegarDetalhesTipoEquipamento(tipoEquipamentoId: number): void {
    this.router.navigate(['/detalhe-tipo-equipamento', tipoEquipamentoId]);
  }

  get nomeEmpresa(): string | undefined {
    return this.empresa?.nome;
  }

  get cnpjEmpresa(): string | undefined {
    return this.empresa?.cnpj;
  }

  VoltarParaLista(): void {
    this.location.back();
  }

  navegarDetalhesColaborador(colaboradorId: number): void {
    this.router.navigate(['/detalhe-colaborador', colaboradorId]);
  }

  irParaTransferenciaDeSituacao(equipamentoId: number): void {
    // Navegar para a tela de transferência com parâmetros
    this.router.navigate(['/altera-situacao'], { queryParams: { equipamentoId: equipamentoId } });
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

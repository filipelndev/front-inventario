import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { ActivatedRoute, Router } from '@angular/router';
import { ColaboradorService } from '../../colaborador.service';
import { Equipamento } from 'src/app/Models/Equipamento';
import { Location } from '@angular/common';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-detalhe-colaborador',
  templateUrl: './detalhe-colaborador.component.html',
  styleUrls: ['./detalhe-colaborador.component.css']
})
export class DetalheColaboradorComponent implements OnInit{
  isLoading: boolean = false;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  colaboradorId: number | undefined;
  colaborador: any;
  equipamentos: Equipamento[] = [];
  dataSource = new MatTableDataSource<Equipamento>(this.equipamentos);
  displayedColumns: string[] = ['tagPatrimonio', 'tipoEquipamento', 'marca', 'modelo', 'situacao', 'empresa',];


  constructor(private route: ActivatedRoute,
  private colaboradorService: ColaboradorService,
  private location: Location,
  private router: Router,) { }

  ngOnInit(): void {
    this.isLoading = true;
    this.route.params.subscribe(params => {
      this.colaboradorId = +params['id'];

      if (this.colaboradorId) {
        this.obterDetalhesColaborador(this.colaboradorId);
        this.carregarEquipamentosDoColaborador();
      }
    });
  }

  obterDetalhesColaborador(colaboradorId: number): void {
    this.colaboradorService.getColaboradorPorId(colaboradorId)
      .subscribe(
        (colaborador: any) => {
          this.colaborador = colaborador;
        },
        error => {
          console.error('Erro ao obter detalhes do tipo de equipamento:', error);
        }
      );
  }

  carregarEquipamentosDoColaborador(): void {
    if (this.colaboradorId) {
      this.colaboradorService.getEquipamentosDoColaborador(this.colaboradorId)
        .subscribe(
          (equipamentos: any) => {
            this.dataSource.data = equipamentos.results;
            this.equipamentos = equipamentos.results;
            this.dataSource.paginator = this.paginator;
            this.isLoading = false;
          },
          error => {
            this.isLoading = false;
            console.error('Erro ao carregar equipamentos do mesmo tipo:', error);
          }
        );
    }
  }

  VoltarParaLista(): void {
    this.location.back();
  }

  navegarDetalhesTipoEquipamento(tipoEquipamentoId: number): void {
    this.router.navigate(['/detalhe-tipo-equipamento', tipoEquipamentoId]);
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

  navegarDetalhesEmpresa(empresaId: number): void {
    this.router.navigate(['/detalhes-empresa', empresaId]);
  }

  irParaTransferenciaDeSituacao(equipamentoId: number): void {
    // Navegar para a tela de transferência com parâmetros
    this.router.navigate(['/altera-situacao'], { queryParams: { equipamentoId: equipamentoId } });
  }
}

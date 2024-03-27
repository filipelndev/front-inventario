import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TipoEquipamentoService } from '../../tipo-equipamento.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { Equipamento } from 'src/app/Models/Equipamento';
import { Location } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-detalhe-tipo-equipamento',
  templateUrl: './detalhe-tipo-equipamento.component.html',
  styleUrls: ['./detalhe-tipo-equipamento.component.css']
})
export class DetalheTipoEquipamentoComponent implements OnInit {
  isLoading: boolean = false;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  tipoEquipamentoId: number | undefined;
  equipamentos: Equipamento[] = [];
  tipoEquipamento: any;
  dataSource = new MatTableDataSource<Equipamento>(this.equipamentos);

  displayedColumns: string[] = ['tagPatrimonio', 'marca', 'modelo', 'situacao', 'empresa', 'colaborador'];


  constructor(private route: ActivatedRoute,
    private tipoEquipamentoService: TipoEquipamentoService,
    private router: Router,
    private location: Location,
    private snackBar: MatSnackBar,) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.tipoEquipamentoId = +params['id'];
      if (this.tipoEquipamentoId) {
        this.isLoading = true;
        this.obterDetalhesTipoEquipamento(this.tipoEquipamentoId);
        this.carregarEquipamentosDoTipo();
      }
    });
  }

  obterDetalhesTipoEquipamento(tipoEquipamentoId: number): void {
    this.tipoEquipamentoService.obterDetalhesTipoEquipamento(tipoEquipamentoId)
      .subscribe(
        (tipoEquipamento: any) => {
          this.tipoEquipamento = tipoEquipamento;
        },
        error => {
          console.error('Erro ao obter detalhes do tipo de equipamento:', error);
        }
      );
  }

  carregarEquipamentosDoTipo(): void {
    if (this.tipoEquipamentoId) {
      this.tipoEquipamentoService.obterEquipamentosDoTipo(this.tipoEquipamentoId)
        .subscribe(
          (equipamentos: any) => {
            this.isLoading = false;
            this.dataSource.data = equipamentos.results;
            this.equipamentos = equipamentos.results;
            this.dataSource.paginator = this.paginator;
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

  navegarDetalhesColaborador(colaboradorId: number): void {

    if(colaboradorId != null)
    {
      this.router.navigate(['/detalhe-colaborador', colaboradorId]);
    }
    else
    {
      console.log('Não há colaborador vinculado a esse equipamento.');
        const errorMessage = "Não há colaborador vinculado a esse equipamento."
          this.snackBar.open(errorMessage, '', {
            duration: 3000,
            horizontalPosition: 'right',
            verticalPosition: 'bottom',
          });
    }
  }

  navegarDetalhesEmpresa(empresaId: number): void {
    this.router.navigate(['/detalhes-empresa', empresaId]);
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

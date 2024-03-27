import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Empresa } from 'src/app/Models/Empresa';
import { Equipamento } from 'src/app/Models/Equipamento';
import { EmpresaService } from '../../empresa.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { Location } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Chart } from 'chart.js';
import * as tinycolor from 'tinycolor2';

@Component({
  selector: 'app-detalhe-empresa',
  templateUrl: './detalhe-empresa.component.html',
  styleUrls: ['./detalhe-empresa.component.css']
})
export class DetalheEmpresaComponent implements OnInit {
  isLoading: boolean = false;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild('TipoChart') TipoChart!: ElementRef;
  @ViewChild('StatusChart') StatusChart!: ElementRef;
  @ViewChild('SetorChart') SetorChart!: ElementRef;

  empresaId: number | undefined;
  empresa: Empresa | undefined = { nome: '', cnpj: '', status: false, equipamentos: [] }; // Inicialize equipamentos como um array vazio
  equipamentos: Equipamento[] = [];
  dataSource = new MatTableDataSource<Equipamento>(this.equipamentos);
  displayedColumns: string[] = ['tagPatrimonio', 'tipoEquipamento', 'marca', 'modelo', 'situacao', 'colaborador',];
  equipamentosPorTipo: any;
  equipamentosPorStatus: any;
  equipamentosPorSetor: any;


  constructor(private route: ActivatedRoute,
    private empresaService: EmpresaService,
    private router: Router,
    private location: Location,
    private snackBar: MatSnackBar,) {}

  ngOnInit(): void {
    this.isLoading = true;
    // Subscreve o evento de alteração de parâmetros na rota
    this.route.paramMap.subscribe(params => {
      // Obtém o ID da empresa a partir dos parâmetros da rota
      this.empresaId = Number(params.get('id'));

      // Carrega os detalhes da empresa com base no ID
      if (this.empresaId) {
        this.carregarDetalhesEmpresa();
        this.carregarEquipamentosDaEmpresa(this.empresaId);
        this.getEquipamentosPorTipo(this.empresaId);
        this.getEquipamentosPorSetor(this.empresaId);
        this.getEquipamentosPorStatus(this.empresaId);
      }
    });
  }

  carregarDetalhesEmpresa(): void {
    if (this.empresaId) {
      this.empresaService.getDetalhesEmpresa(this.empresaId).subscribe(
        (empresa) => {
          this.empresa = empresa;
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
          this.isLoading = false;
        },
        error => {
          this.isLoading = false;
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
  getEquipamentosPorTipo(empresaId: number): void {
    this.empresaService.getEquipamentosPorTipo(empresaId).subscribe(data => {
      this.equipamentosPorTipo = data;
      this.createTipoChart();
    });
  }

  getEquipamentosPorStatus(empresaId: number): void {
    this.empresaService.getEquipamentosPorStatus(empresaId).subscribe(data => {
      this.equipamentosPorStatus = data;
      this.createStatusChart();
    });
  }

  getEquipamentosPorSetor(empresaId: number): void {
    this.empresaService.getEquipamentosPorSetor(empresaId).subscribe(data => {
      this.equipamentosPorSetor = data;
      this.createSetorChart();
    });
  }

  createTipoChart(): void {
    const tipoLabels: string[] = this.equipamentosPorTipo.map((data: any) => data.tipo);
    const tipoQuantidades: number[] = this.equipamentosPorTipo.map((data: any) => data.quantidade);
    const tipoChartCanvas = this.TipoChart.nativeElement.getContext('2d');
    const tipoColors: string[] = this.generateRandomColors(tipoQuantidades.length);
    const tipoBorderColors: string[] = tipoColors.map(color => this.removeAlpha(color));
    this.createChart(tipoChartCanvas, tipoLabels, tipoQuantidades, tipoColors, tipoBorderColors, 'Equipamentos por Tipo');
}

createStatusChart(): void {
    const statusLabels: string[] = this.equipamentosPorStatus.map((data: any) => data.status);
    const statusQuantidades: number[] = this.equipamentosPorStatus.map((data: any) => data.quantidade);
    const statusChartCanvas = this.StatusChart.nativeElement.getContext('2d');
    const statusColors: string[] = this.generateRandomColors(statusQuantidades.length);
    const statusBorderColors: string[] = statusColors.map(color => this.removeAlpha(color));
    this.createChart(statusChartCanvas, statusLabels, statusQuantidades, statusColors, statusBorderColors, 'Equipamentos por Status');
}

createSetorChart(): void {
    const setorLabels: string[] = this.equipamentosPorSetor.map((data: any) => data.setor);
    const setorQuantidades: number[] = this.equipamentosPorSetor.map((data: any) => data.quantidade);
    const setorChartCanvas = this.SetorChart.nativeElement.getContext('2d');
    const setorColors: string[] = this.generateRandomColors(setorQuantidades.length);
    const setorBorderColors: string[] = setorColors.map(color => this.removeAlpha(color));
    this.createChart(setorChartCanvas, setorLabels, setorQuantidades, setorColors, setorBorderColors, 'Equipamentos por Setor');
}

removeAlpha(color: string): string {
    return color.slice(0, -3) + '1)'; // Remove o valor de transparência e adiciona 1 para tornar a cor opaca
}

  createChart(ctx: CanvasRenderingContext2D, labels: string[], data: number[], backgroundColor: string[], borderColor: string[], label: string): void {
    if (this.SetorChart || this.StatusChart || this.TipoChart) {
      if (ctx) {
        const datasets = [{
          label: label,
          data: data,
          backgroundColor: backgroundColor, // Adiciona transparência às cores de fundo
          borderColor: borderColor,
           borderWidth: 2, // Largura da borda
          barPercentage: 0.5, // Ajuste a largura das barras aqui (0.8 = 80% da largura disponível)
        }];

        const barChart = new Chart(ctx, {
          type: 'bar',
          data: {
            labels: labels,
            datasets: datasets,
          },
          options: {
            responsive: false,
            plugins: {
              legend: {
                display: false, // Remover a legenda
              },
            },
          },
        });
      } else {
        console.error('Contexto do gráfico é nulo');
      }
    } else {
      console.error('Elemento do gráfico não encontrado');
    }
  }

  generateRandomColors(count: number): string[] {
    const colors: string[] = [];
    for (let i = 0; i < count; i++) {
      const r = Math.floor(Math.random() * 256);
      const g = Math.floor(Math.random() * 256);
      const b = Math.floor(Math.random() * 256);
      const alpha = 0.3; // Valor de transparência, de 0 a 1 (sendo 0 totalmente transparente e 1 totalmente opaco)
      const color = `rgba(${r}, ${g}, ${b}, ${alpha})`;
      colors.push(color);
    }
    return colors;
  }
}

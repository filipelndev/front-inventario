import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Chart } from 'chart.js';
import { EmpresaService } from '../empresa.service';
import { ColaboradorService } from '../colaborador.service';
import { EquipamentoService } from '../equipamento.service';
import { Empresa } from 'src/app/Models/Empresa';
import { Colaborador } from 'src/app/Models/Colaborador';
import { Equipamento } from 'src/app/Models/Equipamento';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  @ViewChild('colaboradoresChart') colaboradoresChart!: ElementRef;
  @ViewChild('empresasChart') empresasChart!: ElementRef;
  @ViewChild('equipamentosChart') equipamentosChart!: ElementRef;

  empresas: Empresa[] = [];
  colaboradores: Colaborador[] = [];
  equipamentos: Equipamento[] = [];
  empresasAtivas = 0;
  empresasInativas = 0;
  colaboradoresAtivos = 0;
  colaboradoresInativos = 0;
  equipamentosAtivos = 0;
  equipamentosInativos = 0;

  constructor(
    private empresaService: EmpresaService,
    private colaboradorService: ColaboradorService,
    private equipamentoService: EquipamentoService
  ) {}

  ngOnInit(): void {
    this.getDadosEmpresas();
    this.getDadosColaboradores();
    this.getDadosEquipamentos();
  }

  private contarStatusAtivosInativos(itens: any[]): number[] {

    console.log(itens);
    const ativos = itens.filter((item) => item.status === true);
    const inativos = itens.filter((item) => item.status === false);

    return [ativos.length, inativos.length];
  }

  private getDadosEmpresas(): void {
    this.empresaService.getEmpresas().subscribe((empresas: any) => {
      if (Array.isArray(empresas.results)) {
        this.empresas = empresas.results;
        [this.empresasAtivas, this.empresasInativas] = this.contarStatusAtivosInativos(empresas.results);
        console.log('Dados Empresas:', this.empresas);
        this.createEmpresasChart();
      } else {
        console.error('Dados inválidos para Empresas:', empresas);
      }
    });
  }

  private getDadosColaboradores(): void {
    this.colaboradorService.getColaboradores().subscribe((colaboradores: any) => {
      if (Array.isArray(colaboradores.results)) {
        this.colaboradores = colaboradores.results;
        [this.colaboradoresAtivos, this.colaboradoresInativos] = this.contarStatusAtivosInativos(colaboradores.results);
        console.log('Dados Colaboradores:', this.colaboradores);
        this.createColaboradoresChart();
      } else {
        console.error('Dados inválidos para Colaboradores:', colaboradores);
      }
    });
    }


  private getDadosEquipamentos(): void {
    this.equipamentoService.getEquipamentos().subscribe((equipamentos: any) => {
      if (Array.isArray(equipamentos.results)) {
        this.equipamentos = equipamentos.results;
        [this.equipamentosAtivos, this.equipamentosInativos] = this.contarStatusAtivosInativos(equipamentos.results);
        console.log('Dados Equipamentos:', this.equipamentos);
        this.createEquipamentosChart();
      } else {
        console.error('Dados inválidos para Equipamentos:', equipamentos);
      }
    });
  }

  private createEmpresasChart(): void {
    this.createDoughnutChart(this.empresasChart.nativeElement.getContext('2d'), ['Ativas', 'Inativas'], [this.empresasAtivas, this.empresasInativas]);
  }

  private createColaboradoresChart(): void {
    this.createDoughnutChart(this.colaboradoresChart.nativeElement.getContext('2d'), ['Ativos', 'Inativos'], [this.colaboradoresAtivos, this.colaboradoresInativos]);
  }

  private createEquipamentosChart(): void {
    this.createDoughnutChart(this.equipamentosChart.nativeElement.getContext('2d'), ['Ativos', 'Inativos'], [this.equipamentosAtivos, this.equipamentosInativos]);
  }

  private createDoughnutChart(ctx: CanvasRenderingContext2D, labels: string[], data: number[]): void {
    // Calcular o total de empresas ativas e inativas
    const total = data.reduce((acc, value) => acc + value, 0);

    // Criar rótulos fixos para cada fatia
    const labelsWithValues = data.map((value, index) => {
      const percentage = ((value / total) * 100).toFixed(1);
      return `${labels[index]}: ${value} (${percentage}%)`;
    });

    // Criar o gráfico de rosca com rótulos e aumentar a legenda
    const doughnutChart = new Chart(ctx, {
      type: 'doughnut',
      data: {
        labels: labelsWithValues,
        datasets: [
          {
            data: data,
            backgroundColor: ['#01274e', '#333'],
          },
        ],
      },
      options: {
        plugins: {
          legend: {
            display: true,
            position: 'top',
            align: 'start',
            labels: {
              font: {
                  size: 18,
              },
          },
          },
          tooltip: {
            enabled: true,
          },

        },
        cutout: 80,
      },
    });
  }
}

import { Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  ngOnInit(): void {
    this.createColaboradoresChart();

    this.createEmpresasChart();

    this.createEquipamentosChart();

  }

  private createColaboradoresChart(): void {
    // Lógica para criar o gráfico de Colaboradores
    const colaboradoresChart = new Chart('colaboradoresChart', {
      type: 'doughnut', // ou 'pie' para um gráfico de pizza tradicional
      data: {
        labels: ['Ativos', 'Inativos'],
        datasets: [
          {
            data: [70, 30], // Substitua pelos dados reais
            backgroundColor: ['#84c971', '#b777e8'],
          },
        ],
      },
    });
  }

  private createEmpresasChart(): void {
    // Lógica para criar o gráfico de Empresas
    const empresasChart = new Chart('empresasChart', {
      type: 'doughnut',
      data: {
        labels: ['Ativas', 'Inativas'],
        datasets: [
          {
            data: [80, 20], // Substitua pelos dados reais
            backgroundColor: ['#FFCE56', '#4BC0C0'],
          },
        ],
      },
    });
  }

  private createEquipamentosChart(): void {
    // Lógica para criar o gráfico de Equipamentos
    const equipamentosChart = new Chart('equipamentosChart', {
      type: 'doughnut',
      data: {
        labels: ['Ativos', 'Inativos'],
        datasets: [
          {
            data: [60, 40], // Substitua pelos dados reais
            backgroundColor: ['#fb9701', '#e37272'],
          },
        ],
      },
    });
  }

}

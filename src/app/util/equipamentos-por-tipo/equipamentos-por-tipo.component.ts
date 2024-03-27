import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-equipamentos-por-tipo',
  templateUrl: './equipamentos-por-tipo.component.html',
  styleUrls: ['./equipamentos-por-tipo.component.css']
})
export class EquipamentosPorTipoComponent implements OnInit{
  @ViewChild('EquipPorTipoChart') EquipPorTipoChart!: ElementRef;

  ngOnInit(): void {

  }

}

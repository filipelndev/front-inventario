import { Component, OnInit, ViewChild } from '@angular/core';
import { Equipamento } from 'src/app/Models/Equipamento';
import { EmpresaService } from '../../empresa.service';
import { ColaboradorService } from '../../colaborador.service';
import { Colaborador } from 'src/app/Models/Colaborador';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { EditarColaboradorComponent } from '../../colaborador/editar-colaborador/editar-colaborador.component';
import { Empresa } from 'src/app/Models/Empresa';

@Component({
  selector: 'app-cadastrar-equipamento',
  templateUrl: './cadastrar-equipamento.component.html',
  styleUrls: ['./cadastrar-equipamento.component.css']
})
export class CadastrarEquipamentoComponent implements OnInit{
  empresas: Empresa[] = [];
  colaboradores: Colaborador[] = [];

  constructor(private empresaService: EmpresaService, private colaboradorService: ColaboradorService) {}

  ngOnInit(): void {
    this.carregarEmpresas();
    this.carregarColaboradores();
  }

  carregarEmpresas(): void {
    this.empresaService.getEmpresas().subscribe((empresas) => {
      this.empresas = empresas;
    });
  }

  carregarColaboradores(): void {
    this.colaboradorService.getColaboradores().subscribe((colaboradores) => {
      this.colaboradores = colaboradores;
    });
  }

  equipment: Equipamento = {
    tagPatrimonio: '',
    tipoEquipamento: '',
    situacao: '',
    pedidoNFE: '',
    dataCompra: new Date(),
    empresa: '',
    colaborador: '',
    marca: '',
    modelo: '',
    especificacoes: '',
    acessoRemoto: false,
    idAcessoRemoto: '',
    senhaAcesso: '',
    observacoes: '',
    status: true
  };

  onSubmit() {
    // Lógica para salvar o equipamento
    console.log('Equipamento cadastrado:', this.equipment);
    // Adicione aqui a lógica para salvar o equipamento no serviço/back-end
  }
}

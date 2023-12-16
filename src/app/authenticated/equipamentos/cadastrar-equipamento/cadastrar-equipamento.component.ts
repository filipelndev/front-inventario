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
import { EquipamentoService } from '../../equipamento.service';
import { TipoEquipamentoService } from '../../tipo-equipamento.service';
import { TipoEquipamento } from 'src/app/Models/TipoEquipamento';

@Component({
  selector: 'app-cadastrar-equipamento',
  templateUrl: './cadastrar-equipamento.component.html',
  styleUrls: ['./cadastrar-equipamento.component.css']
})
export class CadastrarEquipamentoComponent implements OnInit{
  empresas: Empresa[] = [];
  colaboradores: Colaborador[] = [];
  tipoEquipamento: TipoEquipamento[] = [];

  constructor(
    private empresaService: EmpresaService,
    private colaboradorService: ColaboradorService,
    private equipamentoService: EquipamentoService,
    private tipoEquipamentoService: TipoEquipamentoService
  ) {}

  ngOnInit(): void {
    this.carregarEmpresas();
    this.carregarColaboradores();
    this.carregarTipoEquipamento();
  }

  carregarEmpresas(): void {
    this.empresaService.getEmpresas().subscribe((empresas: any) => {
      this.empresas = empresas.results;
    });
  }

  carregarColaboradores(): void {
    this.colaboradorService.getColaboradores().subscribe((colaboradores: any) => {
      this.colaboradores = colaboradores.results;
    });
  }

  carregarTipoEquipamento(): void {
    this.tipoEquipamentoService.getTipoEquipamento().subscribe((tipoEquipamento: any) => {
      this.tipoEquipamento = tipoEquipamento.results;
    });
  }

  equipment: Equipamento = {
    tag_patrimonio: '',
    tipo_equipamento: {tipo: 'Escolha um tipo de equipamento abaixo:', status: true},
    situacao: '',
    pedido: '',
    data_compra: new Date(),
    empresa: { nome: 'Escolha uma empresa abaixo:', cnpj: '', status: true },
    colaborador: {nome: 'Escolha um colaborador abaixo:', cpf: '', status: true},
    marca: '',
    modelo: '',
    especificacoes: '',
    acesso_remoto: '',
    acesso_id: '',
    acesso_senha: '',
    observacoes: '',
    status: true
  };

  onSubmit() {
    // Lógica para salvar o equipamento
    console.log('Equipamento cadastrado:', this.equipment);
    // Adicione aqui a lógica para salvar o equipamento no serviço/back-end
  }
}

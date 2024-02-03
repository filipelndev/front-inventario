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
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-cadastrar-equipamento',
  templateUrl: './cadastrar-equipamento.component.html',
  styleUrls: ['./cadastrar-equipamento.component.css'],
})

export class CadastrarEquipamentoComponent implements OnInit{
  empresas: Empresa[] = [];
  colaboradores: Colaborador[] = [];
  tipoEquipamento: TipoEquipamento[] = [];
  tem_acesso_remoto: boolean = false;

  mensagemCadastro: string | null = null;

  constructor(
    private empresaService: EmpresaService,
    private colaboradorService: ColaboradorService,
    private equipamentoService: EquipamentoService,
    private tipoEquipamentoService: TipoEquipamentoService,
    private router: Router,
    private datePipe: DatePipe
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
    const dataFormatada = this.formatarData(this.equipment.data_compra);
    // Adicione aqui a lógica para salvar o equipamento no serviço/back-end
    const equipmentToSend: any = {
      tag_patrimonio: this.equipment.tag_patrimonio,
      tipo_equipamento: this.equipment.tipo_equipamento,
      situacao: this.equipment.situacao,
      pedido: this.equipment.pedido,
      data_compra: dataFormatada,
      empresa: this.equipment.empresa.id, // Ajuste aqui para enviar apenas o ID da empresa
      colaborador: this.equipment.colaborador.id, // Ajuste aqui para enviar apenas o ID do colaborador
      marca: this.equipment.marca,
      modelo: this.equipment.modelo,
      especificacoes: this.equipment.especificacoes,
      acesso_remoto: this.equipment.acesso_remoto,
      acesso_id: this.equipment.acesso_id,
      acesso_senha: this.equipment.acesso_senha,
      observacoes: this.equipment.observacoes,
      status: this.equipment.status
    };

    console.log(equipmentToSend.data_compra);

    this.equipamentoService.cadastrarEquipamento(equipmentToSend).subscribe(
      response => {
        console.log('Colaborador cadastrado com sucesso!', response);
        this.equipment = { tag_patrimonio: '',
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
        status: true };
        this.mensagemCadastro = 'Colaborador cadastrado com sucesso!'
        setTimeout(() => {
          this.mensagemCadastro = null;
        }, 4000);

      },
      error => {
        console.error('Erro ao cadastrar colaborador', error);
        this.mensagemCadastro = 'Erro ao cadastrar colaborador. Por favor, tente novamente.';
        setTimeout(() => {
          this.mensagemCadastro = null;
        }, 4000);
      }
    );
  }

  onVoltarClick(): void {
    this.router.navigate(['/dashboard']);
  }

  formatarData(data: Date): string {
    return this.datePipe.transform(data, 'YYYY-MM-dd') || '';
  }
}

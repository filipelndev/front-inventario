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
import { MatSnackBar } from '@angular/material/snack-bar';

import { HttpClient } from '@angular/common/http';
import { SetorService } from 'src/app/setor/setor.service';
import { Setor } from 'src/app/Models/Setor';
import { Location } from '@angular/common';

@Component({
  selector: 'app-cadastrar-equipamento',
  templateUrl: './cadastrar-equipamento.component.html',
  styleUrls: ['./cadastrar-equipamento.component.css'],
})

export class CadastrarEquipamentoComponent implements OnInit{
  isLoading: boolean = false;
  empresas: Empresa[] = [];
  colaboradores: Colaborador[] = [];
  setores: Setor[] = []
  tipoEquipamento: TipoEquipamento[] = [];
  tem_acesso_remoto: boolean = false;

  mensagemCadastro: string | null = null;

  constructor(
    private empresaService: EmpresaService,
    private colaboradorService: ColaboradorService,
    private equipamentoService: EquipamentoService,
    private tipoEquipamentoService: TipoEquipamentoService,
    private router: Router,
    private datePipe: DatePipe,
    private snackBar: MatSnackBar,
    private http: HttpClient,
    private setorService: SetorService,
    private location: Location,
  ) {}

  ngOnInit(): void {
    this.isLoading = true;
    this.carregarEmpresas();
    this.getColaboradores();
    this.carregarTipoEquipamento();
    this.getSetores();
  }

  carregarEmpresas(): void {
    this.empresaService.getEmpresas().subscribe((empresas: any) => {
      this.empresas = empresas.results;
    });
  }

  getColaboradores(): void {
    this.colaboradorService.getColaboradores().subscribe((colaboradores: any) => {
      this.colaboradores = colaboradores.results;
    });
  }

  getSetores(): void {
    this.setorService.listarSetores().subscribe((setores: any) => {
      this.setores = setores.results;
      this.isLoading = false;
    });
  }

  carregarTipoEquipamento(): void {
    this.tipoEquipamentoService.getTipoEquipamento().subscribe((tipoEquipamento: any) => {
      this.tipoEquipamento = tipoEquipamento.results;
    });
  }

  equipment: Equipamento = {
    tag_patrimonio: '',
    tipo_equipamento_id: {tipo: 'Escolha um tipo de equipamento abaixo:', status: true},
    situacao: '',
    pedido: '',
    data_compra: new Date(),
    empresa_id: { nome: 'Escolha uma empresa abaixo:', cnpj: '', status: true },
    colaborador_id: {nome: 'Escolha um colaborador abaixo:', cpf: '', status: true},
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
    if(this.equipment != undefined)
    {

      const equipmentToSend: any = {
        tag_patrimonio: this.equipment.tag_patrimonio,
        tipo_equipamento: this.equipment.tipo_equipamento_id,
        situacao: this.equipment.situacao,
        pedido: this.equipment.pedido,
        data_compra: dataFormatada,
        empresa: this.equipment.empresa_id.id,
        colaborador: this.equipment.colaborador_id?.id,
        setor: this.equipment.setor_id?.id,
        marca: this.equipment.marca,
        modelo: this.equipment.modelo,
        especificacoes: this.equipment.especificacoes,
        acesso_remoto: this.equipment.acesso_remoto,
        acesso_id: this.equipment.acesso_id,
        acesso_senha: this.equipment.acesso_senha,
        observacoes: this.equipment.observacoes,
        status: this.equipment.status
      };

    this.equipamentoService.cadastrarEquipamento(equipmentToSend).subscribe(
      response => {
        this.equipment = { tag_patrimonio: '',
        tipo_equipamento_id: {tipo: 'Escolha um tipo de equipamento abaixo:', status: true},
        situacao: '',
        pedido: '',
        data_compra: new Date(),
        empresa_id: { nome: 'Escolha uma empresa abaixo:', cnpj: '', status: true },
        colaborador_id: {nome: 'Escolha um colaborador abaixo:', cpf: '', status: true},
        marca: '',
        modelo: '',
        especificacoes: '',
        acesso_remoto: '',
        acesso_id: '',
        acesso_senha: '',
        observacoes: '',
        status: true };
        const errorMessage = "Equipamento cadastrado com sucesso!."
          this.snackBar.open(errorMessage, '', {
            duration: 3000,
            horizontalPosition: 'right',
            verticalPosition: 'bottom',
          });

      },
      (errorResponse) => {
        console.error('Erro ao atualizar o equipamento:', errorResponse);

        // Verifica se há erros específicos do campo e formata-os
        let errorMessage = "Erro ao atualizar o equipamento:";
        const errors = errorResponse.error;
        Object.keys(errors).forEach(key => {
          const fieldErrors = errors[key];
          fieldErrors.forEach((error: string) => {
            errorMessage += `\n${key}: ${error}`;
          });
        });

        // Exibe a mensagem de erro formatada
        this.snackBar.open(errorMessage, '', {
          duration: 5000, // Aumente a duração para dar tempo suficiente para ler
          horizontalPosition: 'right',
          verticalPosition: 'bottom',
        });
      }
    );
  } else {
    console.error('ID do equipamento é indefinido. Não é possível atualizar.');
    const errorMessage = "Erro ao localizar o equipamento. ID não existe ou é indefinido";
    this.snackBar.open(errorMessage, '', {
      duration: 3000,
      horizontalPosition: 'right',
      verticalPosition: 'bottom',
    });
  }
}
voltarParaUsuarios(): void {
  // Implemente a navegação de volta para a lista de usuários ou página desejada
  this.location.back();
}

  formatarData(data: Date): string {
    return this.datePipe.transform(data, 'YYYY-MM-dd') || '';
  }
}

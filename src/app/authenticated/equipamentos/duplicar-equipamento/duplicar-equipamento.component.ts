import { Component, OnInit } from '@angular/core';
import { EmpresaService } from '../../empresa.service';
import { ColaboradorService } from '../../colaborador.service';
import { EquipamentoService } from '../../equipamento.service';
import { TipoEquipamentoService } from '../../tipo-equipamento.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpClient } from '@angular/common/http';
import { Setor } from 'src/app/Models/Setor';
import { SetorService } from 'src/app/setor/setor.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Empresa } from 'src/app/Models/Empresa';
import { Colaborador } from 'src/app/Models/Colaborador';
import { TipoEquipamento } from 'src/app/Models/TipoEquipamento';
import { Location } from '@angular/common';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-duplicar-equipamento',
  templateUrl: './duplicar-equipamento.component.html',
  styleUrls: ['./duplicar-equipamento.component.css']
})
export class DuplicarEquipamentoComponent  implements OnInit{
  constructor(
    private empresaService: EmpresaService,
    private colaboradorService: ColaboradorService,
    private equipamentoService: EquipamentoService,
    private tipoEquipamentoService: TipoEquipamentoService,
    private snackBar: MatSnackBar,
    private setorService: SetorService,
    private route: ActivatedRoute,
    private location: Location,
    private datePipe: DatePipe,
  ) {}

  isLoading: boolean = false;
  empresas?: Empresa[] = [];
  colaboradores?: Colaborador[] = [];
  tipoEquipamento?: TipoEquipamento[] = [];
  setores?: Setor[] = []
  equipamento?: any;
  tag_patrimonio: any;
  tags?: any;
  tagExiste?: boolean;


  ngOnInit(): void {
    this.isLoading = true;
    this.carregarEmpresas();
    this.getColaboradores();
    this.carregarTipo();
    this.getSetores();
    this.buscarTag();
    this.route.paramMap.subscribe(params => {
      const equipamentoId = Number(params.get('id'));
      if (equipamentoId) {
        // Aqui você pode chamar um serviço para obter os detalhes do equipamento com base no ID
        this.equipamentoService.getEquipamentoForId(equipamentoId).subscribe(equipamento => {
          this.equipamento = equipamento;
          this.carregarEmpresas();
          this.getColaboradores();~
          this.getSetores();
          this.carregarTipo();
          this.buscarTag();
          if (!this.equipamento.data_compra) {
            this.equipamento.data_compra = new Date(); // Atribui a data atual se a data de compra for nula
          }
        });
      }
    });
  }

  carregarEmpresas(): void {
    this.empresaService.getEmpresas().subscribe((empresas: any) => {
      this.empresas = empresas.results;
    });
  }

  getColaboradores(): void {
    this.colaboradorService.getColaboradores().subscribe(
      (colaboradores: any) => {
        this.colaboradores = colaboradores.results;
      },
      error => {
        console.error('Erro ao carregar colaboradores:', error);
      }
    );
  }

  getSetores(): void {
    this.setorService.listarSetores().subscribe(
      (setores: any) => {
        this.setores = setores.results;
      },
      error => {
        console.error('Erro ao carregar colaboradores:', error);
      }
    );
  }


  carregarTipo(): void {
    this.tipoEquipamentoService.getTipoEquipamento().subscribe((tipoEquipamento: any) => {
      this.tipoEquipamento = tipoEquipamento.results;
      this.isLoading = false;
    });
  }

  buscarTag() : void {
    this.equipamentoService.buscarTag().subscribe((tags: any) => {
      this.tags = tags;
    });
  }

  compararTag(): void {
    if (this.tag_patrimonio && this.tags) {
      // Verifica se a tag atual existe entre as tags existentes
      this.tagExiste = this.tags.some((tag: any) => tag.tag_patrimonio === this.tag_patrimonio);
    } else {
      // Se o campo estiver vazio ou as tags não forem carregadas, exibe o ícone de erro
      this.tagExiste = true; // ou false, dependendo do comportamento desejado
    }
  }

  onSubmit() {
    // Lógica para salvar o equipamento
    const dataFormatada = this.formatarData(this.equipamento.data_compra);
    // Adicione aqui a lógica para salvar o equipamento no serviço/back-end
    if(this.equipamento != undefined)
    {

      const equipmentToSend: any = {
        tag_patrimonio: this.tag_patrimonio,
        tipo_equipamento: this.equipamento.tipo_equipamento_id,
        situacao: this.equipamento.situacao,
        pedido: this.equipamento.pedido,
        data_compra: dataFormatada,
        empresa: this.equipamento.empresa_id,
        colaborador: this.equipamento.colaborador_id,
        setor: this.equipamento.setor_id,
        marca: this.equipamento.marca,
        modelo: this.equipamento.modelo,
        especificacoes: this.equipamento.especificacoes,
        acesso_remoto: this.equipamento.acesso_remoto,
        acesso_id: this.equipamento.acesso_id,
        acesso_senha: this.equipamento.acesso_senha,
        observacoes: this.equipamento.observacoes,
        status: this.equipamento.status
      };

    this.equipamentoService.cadastrarEquipamento(equipmentToSend).subscribe(
      response => {
        const errorMessage = "Equipamento duplicado com sucesso!."
          this.snackBar.open(errorMessage, '', {
            duration: 3000,
            horizontalPosition: 'right',
            verticalPosition: 'bottom',
          });
          this.location.back();
      },
      (errorResponse) => {
        console.error('Erro ao duplicar o equipamento:', errorResponse);

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
    console.error('ID do equipamento é indefinido. Não é possível duplicar.');
    const errorMessage = "Erro ao localizar o equipamento. ID não existe ou é indefinido";
    this.snackBar.open(errorMessage, '', {
      duration: 3000,
      horizontalPosition: 'right',
      verticalPosition: 'bottom',
    });
  }
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

  voltarParaUsuarios(): void {
    // Implemente a navegação de volta para a lista de usuários ou página desejada
    this.location.back();
  }

  formatarData(data: Date): string {

    if (!data) {
      // Se a data for nula, use a data atual
      data = data;
    }
    return this.datePipe.transform(data, 'YYYY-MM-dd') || '';
  }
}

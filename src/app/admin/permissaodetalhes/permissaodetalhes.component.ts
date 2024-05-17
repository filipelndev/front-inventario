import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PermissaoService } from '../permissao.service';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-permissaodetalhes',
  templateUrl: './permissaodetalhes.component.html',
  styleUrls: ['./permissaodetalhes.component.css']
})
export class PermissaodetalhesComponent implements OnInit {
  grupoId: number | undefined;
  grupo?: any;
  detalheGrupo: any;

  visualizaColaborador: boolean = false;
  editaColaborador: boolean = false;
  detalheColaborador: boolean = false;

  visualizaEmpresa: boolean = false;
  editaEmpresa: boolean = false;
  detalheEmpresa: boolean = false;

  visualizaEquipamento: boolean = false;
  editaEquipamento: boolean = false;
  detalheEquipamento: boolean = false;

  visualizaTipoEquipamento: boolean = false;
  editaTipoEquipamento: boolean = false;
  detalheTipoEquipamento: boolean = false;

  visualizaSetor: boolean = false;
  editaSetor: boolean = false;
  detalheSetor: boolean = false;

  visualizaCategoria: boolean = false;
  editaCategoria: boolean = false;
  detalheCategoria: boolean = false;

  visualizaItem: boolean = false;
  editaItem: boolean = false;
  detalheItem: boolean = false;

  visualizaMovimentacao: boolean = false;
  editaMovimentacao: boolean = false;

  constructor(private permissaoService: PermissaoService, @Inject(MAT_DIALOG_DATA) public data: { grupo: any },  private dialogRef: MatDialogRef<PermissaodetalhesComponent>) {}

  ngOnInit(): void {
    this.grupo = this.data;
    this.grupoId = this.grupo.group.id;

    if (this.grupoId !== undefined) {
      this.permissaoService.buscarDetalhesDoGrupo(this.grupoId).subscribe(
        (detalhesGrupo) => {
          this.detalheGrupo = detalhesGrupo;
          console.log(detalhesGrupo);

          // Mapeia as chaves de permissions_list para variáveis booleanas
          const permissions = detalhesGrupo.permissions_list || {};

          this.visualizaColaborador = permissions['Visualizar Colaboradores'] || false;
          this.editaColaborador = permissions['Editar Colaborador'] || false;
          this.detalheColaborador = permissions['Visualizar Detalhes do Colaborador'] || false;

          this.visualizaEmpresa = permissions['Visualizar empresas'] || false;
          this.editaEmpresa = permissions['Editar Empresa'] || false;
          this.detalheEmpresa = permissions['Visualizar Detalhes da Empresa'] || false;

          this.visualizaEquipamento = permissions['Visualizar Equipamentos'] || false;
          this.editaEquipamento = permissions['Editar Equipamento'] || false;
          this.detalheEquipamento = permissions['Visualizar Detalhes do Equipamento'] || false;

          this.visualizaTipoEquipamento = permissions['Visualizar Tipos de Equipamentos'] || false;
          this.editaTipoEquipamento = permissions['Editar Tipo de Equipamento'] || false;
          this.detalheTipoEquipamento = permissions['Visualizar Detalhes do Tipo de Equipamento'] || false;

          this.visualizaSetor = permissions['Visualizar setores'] || false;
          this.editaSetor = permissions['Editar setor'] || false;
          this.detalheSetor = permissions['Visualizar Detalhes do setor'] || false;

          this.visualizaCategoria = permissions['Visualizar Categorias'] || false;
          this.editaCategoria = permissions['Editar Categoria'] || false;
          this.detalheCategoria = permissions['Visualizar Detalhes Categoria'] || false;

          this.visualizaItem = permissions['Visualizar itens'] || false;
          this.editaItem = permissions['Editar item'] || false;
          this.detalheItem = permissions['Visualizar Detalhes item'] || false;

          this.visualizaMovimentacao = permissions['Visualizar Movimentacao de Estoque'] || false;
          this.editaMovimentacao = permissions['Criar Movimentacao de Estoque'] || false;

          console.log('Detalhes do grupo:', detalhesGrupo);
        },
        (error) => {
          console.error('Erro ao obter detalhes do grupo:', error);
        }
      );
    }
  }

  atualizarPermissoes() {
    // Construa um objeto com as permissões atualizadas do grupo
    const novasPermissoes: any = {
        visualizar_colaborador: this.visualizaColaborador,
        editar_colaborador: this.editaColaborador,
        visualiza_detalhe_colaborador: this.detalheColaborador,

        visualizar_empresa: this.visualizaEmpresa,
        editar_empresa: this.editaEmpresa,
        visualiza_detalhe_empresa: this.detalheEmpresa,

        visualizar_equipamento: this.visualizaEquipamento,
        editar_equipamento: this.editaEquipamento,
        visualiza_detalhe_equipamento: this.detalheEquipamento,

        visualizar_tipo_equipamento: this.visualizaTipoEquipamento,
        editar_tipo_equipamento: this.editaTipoEquipamento,
        visualiza_detalhe_tipo_equipamento: this.detalheTipoEquipamento,

        visualizar_setor: this.visualizaSetor,
        editar_setor: this.editaSetor,
        visualiza_detalhe_setor: this.detalheSetor,

        visualizar_categoria: this.visualizaCategoria,
        editar_categoria: this.editaCategoria,
        visualiza_detalhe_categoria: this.detalheCategoria,

        visualizar_item: this.visualizaItem,
        editar_item: this.editaItem,
        visualiza_detalhe_item: this.detalheItem,

        visualizar_movimentacao_estoque: this.visualizaMovimentacao,
        editar_movimentacao_estoque: this.editaMovimentacao
    }; 

    if(this.grupoId!= null)
    {
      // Envie a solicitação para atualizar as permissões do grupo
    this.permissaoService.atualizarPermissoesDoGrupo(this.grupo?.group.id, this.grupo?.group.name, novasPermissoes).subscribe(() => {
      console.log('Permissões do grupo atualizadas com sucesso!');
      this.dialogRef.close();
    }, error => {
      console.error('Erro ao atualizar as permissões do grupo:', error);
    });
    }
    else
    {
      console.log('Erro ao atualizar as permissões do grupo:');
    }

  }
}


import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PermissaoService } from '../permissao.service';

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

  constructor(private permissaoService: PermissaoService, @Inject(MAT_DIALOG_DATA) public data: { grupo: any }) {}

  ngOnInit(): void {
    this.grupo = this.data;
    this.grupoId = this.grupo.group.id;

    if (this.grupoId !== undefined) {
      this.permissaoService.buscarDetalhesDoGrupo(this.grupoId).subscribe(
        (detalhesGrupo) => {
          this.detalheGrupo = detalhesGrupo;

          // Mapeia as chaves de permissions_list para variáveis booleanas
          const permissions = detalhesGrupo.permissions_list || {};

          this.visualizaColaborador = permissions['Visualizar Colaboradores'] || false;
          this.editaColaborador = permissions['Editar Colaborador'] || false;
          this.detalheColaborador = permissions['Visualiar Detalhes do Colaborador'] || false;

          this.visualizaEmpresa = permissions['Visualizar empresas'] || false;
          this.editaEmpresa = permissions['Editar Empresa'] || false;
          this.detalheEmpresa = permissions['Visualizar Detalhes da Empresa'] || false;

          this.visualizaEquipamento = permissions['Visualizar Equipamentos'] || false;
          this.editaEquipamento = permissions['Editar Equipamento'] || false;
          this.detalheEquipamento = permissions['Visualiar Detalhes do Equipamento'] || false;

          this.visualizaTipoEquipamento = permissions['Visualizar Tipos de Equipamentos'] || false;
          this.editaTipoEquipamento = permissions['Editar Tipo de Equipamento'] || false;
          this.detalheTipoEquipamento = permissions['Visualizar Detalhes do Tipo de Equipamento'] || false;

          console.log('Detalhes do grupo:', detalhesGrupo);
        },
        (error) => {
          console.error('Erro ao obter detalhes do grupo:', error);
        }
      );
    }
  }
}

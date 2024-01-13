import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { PermissaoService } from '../permissao.service';

@Component({
  selector: 'app-criar-grupo-permissao',
  templateUrl: './criar-grupo-permissao.component.html',
  styleUrls: ['./criar-grupo-permissao.component.css']
})
export class CriarGrupoPermissaoComponent {
  nomeGrupo: string = '';

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

  constructor(private router: Router, private permissaoService: PermissaoService) {}

  criarGrupoPermissoes(): void {

    // Construa um objeto com os dados do grupo a ser criado
    const novoGrupo = {
      name: this.nomeGrupo,
      permissions: {
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
        visualiza_detalhe_tipo_equipamento: this.detalheTipoEquipamento
      }
    };
    console.log(novoGrupo);

    // Chame o serviço para criar o grupo
    this.permissaoService.createGroup(novoGrupo).subscribe(
      (response) => {
        // Redirecione para a página de detalhes do grupo ou outra página
        this.router.navigate(['/usuarioPermissoes']);
      },
      (error) => {
        console.error('Erro ao criar o grupo de permissões:', error);
        // Lide com o erro, exiba uma mensagem, etc.
      }
    );
  }

  voltarParaUsuarios() {
    this.router.navigate(['/usuarioPermissoes']);
  }
}

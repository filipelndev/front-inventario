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

  selecionarTodosVisualizar: boolean = false;
  selecionarTodosEditar: boolean = false;
  selecionarTodosDetalhes: boolean = false;

  selecionarTodosColaborador: boolean = false;
  selecionarTodosEmpresa: boolean = false;
  selecionarTodosEquipamento: boolean = false;
  selecionarTodosTipoEquipamento: boolean = false;

  selecionarTodos: boolean = false;

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
        this.router.navigate(['/usuario-permissoes']);
      },
      (error) => {
        console.error('Erro ao criar o grupo de permissões:', error);
        // Lide com o erro, exiba uma mensagem, etc.
      }
    );
  }

  voltarParaUsuarios() {
    this.router.navigate(['/usuario-permissoes']);
  }

  toggleSelecionarTodosVisualizar(): void {
    this.visualizaColaborador = this.selecionarTodosVisualizar;
    this.visualizaEmpresa = this.selecionarTodosVisualizar;
    this.visualizaEquipamento = this.selecionarTodosVisualizar;
    this.visualizaTipoEquipamento = this.selecionarTodosVisualizar;
  }

  toggleSelecionarTodoseditar(): void {
    this.editaColaborador = this.selecionarTodosEditar;
    this.editaEmpresa = this.selecionarTodosEditar;
    this.editaEquipamento = this.selecionarTodosEditar;
    this.editaTipoEquipamento = this.selecionarTodosEditar;
  }
  toggleSelecionarTodosDetalhe(): void {
    this.detalheColaborador = this.selecionarTodosDetalhes;
    this.detalheEmpresa = this.selecionarTodosDetalhes;
    this.detalheEquipamento = this.selecionarTodosDetalhes;
    this.detalheTipoEquipamento = this.selecionarTodosDetalhes;
  }

  toogleSelecionarTodosColaborador(): void {
    this.visualizaColaborador = this.selecionarTodosColaborador;
    this.editaColaborador = this.selecionarTodosColaborador;
    this.detalheColaborador = this.selecionarTodosColaborador;
  }

  toogleSelecionarTodosEmpresa(): void {
    this.visualizaEmpresa = this.selecionarTodosEmpresa;
    this.editaEmpresa = this.selecionarTodosEmpresa;
    this.detalheEmpresa = this.selecionarTodosEmpresa;
  }

  toogleSelecionarTodosEquipamento(): void {
    this.visualizaEquipamento = this.selecionarTodosEquipamento;
    this.editaEquipamento = this.selecionarTodosEquipamento;
    this.detalheEquipamento = this.selecionarTodosEquipamento;
  }

  toogleSelecionarTodosTipoEquipamento(): void {
    this.visualizaTipoEquipamento = this.selecionarTodosTipoEquipamento;
    this.editaTipoEquipamento = this.selecionarTodosTipoEquipamento;
    this.detalheTipoEquipamento = this.selecionarTodosTipoEquipamento;
  }

  toogleSelecionarTodos(): void {
    this.selecionarTodosVisualizar = this.selecionarTodos;
    this.selecionarTodosEditar = this.selecionarTodos;
    this.selecionarTodosDetalhes = this.selecionarTodos;
    this.selecionarTodosColaborador = this.selecionarTodos;
    this.selecionarTodosEmpresa = this.selecionarTodos;
    this.selecionarTodosEquipamento = this.selecionarTodos;
    this.selecionarTodosTipoEquipamento = this.selecionarTodos;
    this.toggleSelecionarTodosVisualizar();
    this.toggleSelecionarTodoseditar();
    this.toggleSelecionarTodosDetalhe();
  }

  SelecionarTodosVisualizar(coluna: string): void {
    switch (coluna) {
      case 'visualizaColaborador':
        this.visualizaColaborador = this.selecionarTodosVisualizar;
        // Adicione lógica semelhante para outras colunas se necessário
        break;
      // Adicione outros casos conforme necessário
    }
  }

  SelecionarTodosEditar(coluna: string): void {
    switch (coluna) {
      case 'visualizaColaborador':
        this.editaColaborador = this.selecionarTodosEditar;
        // Adicione lógica semelhante para outras colunas se necessário
        break;
      // Adicione outros casos conforme necessário
    }
  }

  SelecionarTodosDetalhes(coluna: string): void {
    switch (coluna) {
      case 'visualizaColaborador':
        this.detalheColaborador = this.selecionarTodosDetalhes;
        // Adicione lógica semelhante para outras colunas se necessário
        break;
      // Adicione outros casos conforme necessário
    }
  }
}

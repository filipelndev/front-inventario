import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { PermissaoService } from '../permissao.service';
import { MatSnackBar } from '@angular/material/snack-bar';

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
  selecionarTodosSetor: boolean = false;
  selecionarTodosCategoria: boolean = false;
  selecionarTodosItem: boolean = false;
  selecionarTodosMovimentacao = false;

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

  constructor(private router: Router, private permissaoService: PermissaoService,  private snackBar: MatSnackBar) {}

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
      }
    };
    console.log(novoGrupo);

    // Chame o serviço para criar o grupo
    this.permissaoService.createGroup(novoGrupo).subscribe(
      (response) => {
        const errorMessage = "Grupo de permissões cadastrado com sucesso!"
              this.snackBar.open(errorMessage, '', {
                duration: 3000,
                horizontalPosition: 'right',
                verticalPosition: 'bottom',
              });
        this.router.navigate(['/usuario-permissoes']);
      },
      (error) => {
        console.error('Erro ao criar o grupo de permissões:', error);
        const errorMessage = "Erro ao criar grupo de permissões, verifique se há permissões selecionadas."
              this.snackBar.open(errorMessage, '', {
                duration: 3000,
                horizontalPosition: 'right',
                verticalPosition: 'bottom',
              });
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
    this.visualizaSetor = this.selecionarTodosVisualizar;
    this.visualizaCategoria = this.selecionarTodosVisualizar;
    this.visualizaItem = this.selecionarTodosVisualizar
  }

  toggleSelecionarTodoseditar(): void {
    this.editaColaborador = this.selecionarTodosEditar;
    this.editaEmpresa = this.selecionarTodosEditar;
    this.editaEquipamento = this.selecionarTodosEditar;
    this.editaTipoEquipamento = this.selecionarTodosEditar;
    this.editaSetor = this.selecionarTodosEditar;
    this.editaCategoria = this.selecionarTodosEditar;
    this.editaItem = this.selecionarTodosEditar;
  }
  toggleSelecionarTodosDetalhe(): void {
    this.detalheColaborador = this.selecionarTodosDetalhes;
    this.detalheEmpresa = this.selecionarTodosDetalhes;
    this.detalheEquipamento = this.selecionarTodosDetalhes;
    this.detalheTipoEquipamento = this.selecionarTodosDetalhes;
    this.detalheSetor = this.selecionarTodosDetalhes;
    this.detalheCategoria = this.selecionarTodosDetalhes;
    this.detalheItem = this.selecionarTodosDetalhes;
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

  toogleSelecionarTodosSetor(): void {
    this.visualizaSetor = this.selecionarTodosSetor;
    this.editaSetor = this.selecionarTodosSetor;
    this.detalheSetor = this.selecionarTodosSetor;
  }

  toogleSelecionarTodosCategoria(): void {
    this.visualizaCategoria = this.selecionarTodosCategoria;
    this.editaCategoria = this.selecionarTodosCategoria;
    this.detalheCategoria = this.selecionarTodosCategoria;
  }

  toogleSelecionarTodosItem(): void {
    this.visualizaItem = this.selecionarTodosItem;
    this.editaItem = this.selecionarTodosItem;
    this.detalheItem = this.selecionarTodosItem;
  }

  toogleSelecionarTodosMovimentacao(): void {
    this.visualizaMovimentacao = this.selecionarTodosMovimentacao;
    this.editaMovimentacao = this.selecionarTodosMovimentacao;
  }

  toogleSelecionarTodos(): void {
    this.selecionarTodosVisualizar = this.selecionarTodos;
    this.selecionarTodosEditar = this.selecionarTodos;
    this.selecionarTodosDetalhes = this.selecionarTodos;
    this.selecionarTodosColaborador = this.selecionarTodos;
    this.selecionarTodosEmpresa = this.selecionarTodos;
    this.selecionarTodosEquipamento = this.selecionarTodos;
    this.selecionarTodosTipoEquipamento = this.selecionarTodos;
    this.selecionarTodosSetor = this.selecionarTodos;
    this.selecionarTodosCategoria = this.selecionarTodos;
    this.selecionarTodosItem = this.selecionarTodos;
    this.selecionarTodosMovimentacao = this.selecionarTodos;
    this.toggleSelecionarTodosVisualizar();
    this.toggleSelecionarTodoseditar();
    this.toggleSelecionarTodosDetalhe();
    this.toogleSelecionarTodosSetor();
    this.toogleSelecionarTodosCategoria();
    this.toogleSelecionarTodosItem();
    this.toogleSelecionarTodosMovimentacao();
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

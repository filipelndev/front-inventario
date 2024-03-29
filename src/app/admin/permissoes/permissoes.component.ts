import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PermissaoService } from '../permissao.service';
import { UserService } from '../user.service';
import { PermissaoUsuario } from 'src/app/Models/PermissaoUsuario';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-permissoes',
  templateUrl: './permissoes.component.html',
  styleUrls: ['./permissoes.component.css']
})
export class PermissoesComponent implements OnInit {
  usuarioId?: number;
  nomeUsuario?: string;
  gruposDisponiveis: PermissaoUsuario[] = [];
  gruposSelecionados: PermissaoUsuario[] = [];

  constructor(
    private route: ActivatedRoute,
    private permissaoService: PermissaoService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    // Obter o ID e o nome do usuário da rota
    this.route.params.subscribe(params => {
      this.usuarioId = +params['id'];
      this.nomeUsuario = params['username'];
    });

    // Carregar grupos disponíveis
    this.carregarGruposDisponiveis();
  }

  carregarGruposDisponiveis() {
    // Assumindo que PermissaoService tem um método para obter grupos disponíveis
    this.permissaoService.getGroups().subscribe(
      grupos => {
        this.gruposDisponiveis = grupos.map(grupo => ({ id: grupo.id, nome: grupo.name }));
      },
      erro => {
        console.error('Erro ao obter grupos disponíveis:', erro);
      }
    );
  }

  toggleSelecao(grupo: PermissaoUsuario) {
    const index = this.gruposSelecionados.findIndex(g => g.id === grupo.id);

    if (index === -1) {
      this.gruposSelecionados.push(grupo);
    } else {
      this.gruposSelecionados.splice(index, 1);
    }
  }

  estaSelecionado(grupo: PermissaoUsuario): boolean {
    return this.gruposSelecionados.some(g => g.id === grupo.id);
  }

  salvarPermissoes() {
    // Certifique-se de que nomeUsuario e usuarioId não são nulos ou indefinidos antes de usá-los
    if (this.nomeUsuario && this.usuarioId !== undefined) {
      // Aqui você pode usar o PermissaoService para associar os grupos ao usuário
      this.permissaoService.associateUserWithGroups(this.usuarioId, this.gruposSelecionados.map(g => g.id))
        .subscribe(
          resposta => {
            console.log('Permissões salvas com sucesso:', resposta);
            const errorMessage = "Permissões salvas com sucesso!."
              this.snackBar.open(errorMessage, '', {
                duration: 3000,
                horizontalPosition: 'right',
                verticalPosition: 'bottom',
              });
          },
          erro => {
            console.error('Erro ao salvar permissões:', erro);
            const errorMessage = "Erro ao salvar permissões, verifique se há permissões selecionadas."
            this.snackBar.open(errorMessage, '', {
              duration: 3000,
              horizontalPosition: 'right',
              verticalPosition: 'bottom',
            });
          }
        );
    }
  }
}

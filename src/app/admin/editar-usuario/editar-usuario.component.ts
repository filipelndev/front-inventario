import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../user.service';
import { PermissaoService } from '../permissao.service';
import { PermissaoUsuario } from 'src/app/Models/PermissaoUsuario';

interface GrupoResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: {
    id: number;
    name: string;
    // Adicione outras propriedades conforme necessário
  }[];
}

@Component({
  selector: 'app-editar-usuario',
  templateUrl: './editar-usuario.component.html',
  styleUrls: ['./editar-usuario.component.css']
})
export class EditarUsuarioComponent implements OnInit {
  usuario: any = {}; // Inicialize o objeto do usuário com um objeto vazio
  gruposDisponiveis: PermissaoUsuario[] = [];
  gruposSelecionados: PermissaoUsuario[] = [];

  constructor(private route: ActivatedRoute, private userService: UserService, private permissaoService: PermissaoService, private router: Router) {}

  ngOnInit(): void {
    // Obter o ID do usuário da rota
    this.route.params.subscribe(params => {
      const userId = +params['id'];

      // Carregar dados do usuário
      this.carregarUsuario(userId);

      // Carregar grupos disponíveis
      this.carregarGruposDisponiveis();
    });
  }

  carregarUsuario(userId: number): void {
    // Assumindo que UserService tem um método para obter dados do usuário por ID
    this.userService.getUserById(userId).subscribe(
      usuario => {
        this.usuario = usuario;
        // Preencher os grupos selecionados inicialmente com os grupos do usuário
        this.gruposSelecionados = usuario.grupos;
      },
      erro => {
        console.error('Erro ao obter usuário:', erro);
      }
    );
  }

  carregarGruposDisponiveis() {
    this.permissaoService.getGroups().subscribe(
      (resposta: GrupoResponse | any[]) => {
        // Verifica se 'resposta' tem a propriedade 'results'
        if (Array.isArray(resposta)) {
          this.gruposDisponiveis = resposta.map(grupo => ({ id: grupo.id, nome: grupo.name }));
        } else if (resposta.results) {
          this.gruposDisponiveis = resposta.results.map(grupo => ({ id: grupo.id, nome: grupo.name }));
        } else {
          console.error('A resposta do serviço não contém a propriedade "results":', resposta);
        }
      },
      erro => {
        console.error('Erro ao obter grupos disponíveis:', erro);
      }
    );
  }

  toggleSelecaoCheckbox(grupo: any): void {
    const index = this.gruposSelecionados.findIndex(g => g.id === grupo.id);

    if (index === -1) {
      this.gruposSelecionados.push(grupo);
    } else {
      this.gruposSelecionados.splice(index, 1);
    }
  }

  estaSelecionado(grupo: any): boolean {
    return this.gruposSelecionados.some(g => g.id === grupo.id);
  }

  selecionarTodos(checked: boolean): void {
    if (checked) {
      // Selecionar todos os grupos disponíveis
      this.gruposSelecionados = [...this.gruposDisponiveis];
    } else {
      // Desmarcar todos os grupos
      this.gruposSelecionados = [];
    }
  }

  salvarEdicao(): void {
    const userId = this.usuario.id;

    this.permissaoService.associateUserWithGroups(userId, this.gruposSelecionados.map(g => g.id))
      .subscribe(
        resposta => {
          console.log('Edição salva com sucesso:', resposta);
          // Adicione a navegação de volta para a lista de usuários ou página desejada
          this.router.navigate(['/usuarioPermissoes']);
        },
        erro => {
          console.error('Erro ao salvar edição:', erro);
        }
      );
  }

  voltarParaUsuarios(): void {
    // Implemente a navegação de volta para a lista de usuários ou página desejada
    this.router.navigate(['/usuario-permissoes']);
  }
}

// cadastrar-usuario.component.ts
import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { PermissaoService } from '../permissao.service';
import { PermissaoUsuario } from 'src/app/Models/PermissaoUsuario';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

// Interface para definir a estrutura esperada do objeto 'grupo'
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
  selector: 'app-cadastrar-usuario',
  templateUrl: './cadastrar-usuario.component.html',
  styleUrls: ['./cadastrar-usuario.component.css']
})
export class CadastrarUsuarioComponent implements OnInit {
  usuario = {
    username: '',
    password: '',
    email: ''
  };

  gruposDisponiveis: MatTableDataSource<PermissaoUsuario> = new MatTableDataSource<PermissaoUsuario>();

  gruposSelecionados: PermissaoUsuario[] = [];

  constructor(private userService: UserService, private permissaoService: PermissaoService,
    private router: Router, private snackBar: MatSnackBar) {}

  ngOnInit() {
    this.carregarGruposDisponiveis();
  }

  carregarGruposDisponiveis() {
    this.permissaoService.getGroups().subscribe(
      (resposta: GrupoResponse | any[]) => {
        // Verifica se 'resposta' tem a propriedade 'results'
        if (Array.isArray(resposta)) {
          this.gruposDisponiveis.data = resposta.map(grupo => ({ id: grupo.id, nome: grupo.name }));
        } else if (resposta.results) {
          this.gruposDisponiveis.data = resposta.results.map(grupo => ({ id: grupo.id, nome: grupo.name }));
        } else {
          console.error('A resposta do serviço não contém a propriedade "results":', resposta);
        }
      },
      erro => {
        console.error('Erro ao obter grupos disponíveis:', erro);
      }
    );
  }

  toggleSelecaoCheckbox(grupo: PermissaoUsuario) {
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

  selecionarTodos(selecionar: boolean) {
    if (selecionar) {
      this.gruposSelecionados = [...this.gruposDisponiveis.data];
    } else {
      this.gruposSelecionados = [];
    }
  }
  cadastrarUsuario() {
    this.userService.cadastrarUsuario(this.usuario).subscribe(
      resposta => {
        // Após cadastrar, você pode redirecionar para outra página ou fazer algo mais aqui

        // Agora, após cadastrar o usuário, você pode associar os grupos a ele
        const userId = resposta.id; // Supondo que a resposta contenha o ID do usuário recém-criado
        this.permissaoService.associateUserWithGroups(userId, this.gruposSelecionados.map(g => g.id))
          .subscribe(
            response => {
              console.log('Permissões associadas com sucesso:', response);
              const errorMessage = "Usuário cadastrado com sucesso!"
              this.snackBar.open(errorMessage, '', {
                duration: 3000,
                horizontalPosition: 'right',
                verticalPosition: 'bottom',
              });
            },
            error => {
              console.error('Erro ao associar permissões:', error);
              const errorMessage = "Erro ao cadastrar as permissões. Verifique se há permissões marcadas e tente novamente."
              this.snackBar.open(errorMessage, '', {
                duration: 3000,
                horizontalPosition: 'right',
                verticalPosition: 'bottom',
              });
            }
          );
      },
      erro => {
        console.error('Erro ao cadastrar usuário:', erro);
        const errorMessage = "Erro ao cadastrar o usuário. Verifique todos os campos e tente novamente."
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

  }

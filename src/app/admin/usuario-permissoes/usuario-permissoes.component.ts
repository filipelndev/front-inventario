import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { PermissaodetalhesComponent } from '../permissaodetalhes/permissaodetalhes.component';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
  selector: 'app-usuario-permissoes',
  templateUrl: './usuario-permissoes.component.html',
  styleUrls: ['./usuario-permissoes.component.css']
})
export class UsuarioPermissoesComponent implements OnInit {
  users: any[] = [];
  isAdmin: boolean = false;

  constructor(private userService: UserService, private dialog: MatDialog, private router: Router,) {}

  ngOnInit(): void {
    this.userService.getUsers().subscribe((users: any) => {
      this.users = users.results;
      this.userService.isUserAdmin().subscribe((isAdmin) => {
        this.isAdmin = isAdmin;
      });
    });
  }

  loadUsers(): void {
    this.userService.getUsers().subscribe(
      (users: any) => {
        this.users = users.results;
      },
      (error) => {
        console.error('Erro ao carregar usuários:', error);
      }
    );
  }

  openPermissionDialog(group: any): void {
    const dialogRef = this.dialog.open(PermissaodetalhesComponent, {
      data: { group },
      width: '600px',
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  criarUsuario(): void {
    this.router.navigate(['/cadastrar-usuario']);
  }

  criarGrupoPermissoes(): void {
    this.router.navigate(['/criar-grupo-permissao']);
  }

  editarUsuario(id: number) {
    // Navegar para a página de edição com o ID do usuário
    this.router.navigate(['/editar-usuario', id]);
  }

  voltarParaUsuarios(): void {
    // Implemente a navegação de volta para a lista de usuários ou página desejada
    this.router.navigate(['/dashboard']);
  }
}

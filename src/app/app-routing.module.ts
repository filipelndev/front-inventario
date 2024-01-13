import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './authenticated/home/home.component';
import { CadastrarColaboradorComponent } from './authenticated/colaborador/cadastrar-colaborador/cadastrar-colaborador.component';
import { CadastrarEmpresaComponent } from './authenticated/empresa/cadastrar-empresa/cadastrar-empresa.component';
import { ListarEmpresaComponent } from './authenticated/empresa/listar-empresa/listar-empresa.component';
import { CadastrarEquipamentoComponent } from './authenticated/equipamentos/cadastrar-equipamento/cadastrar-equipamento.component';
import { ListarEquipamentosComponent } from './authenticated/equipamentos/listar-equipamentos/listar-equipamentos.component';
import { DetalheEmpresaComponent } from './authenticated/empresa/detalhe-empresa/detalhe-empresa.component';
import { CadastrarTipoEquipamentoComponent } from './authenticated/tipo-equipamento/cadastrar-tipo-equipamento/cadastrar-tipo-equipamento.component';
import { ListarTipoEquipamentoComponent } from './authenticated/tipo-equipamento/listar-tipo-equipamento/listar-tipo-equipamento.component';
import { ListarColaboradorComponent } from './authenticated/colaborador/listar-colaborador/listar-colaborador.component';
import { AuthGuard } from './authenticate/auth.guard';
import { LoginComponent } from './authenticate/login/login.component';
import { PermissoesComponent } from './admin/permissoes/permissoes.component';
import { UsuarioPermissoesComponent } from './admin/usuario-permissoes/usuario-permissoes.component';
import { CriarGrupoPermissaoComponent } from './admin/criar-grupo-permissao/criar-grupo-permissao.component';
import { CadastrarUsuarioComponent } from './admin/cadastrar-usuario/cadastrar-usuario.component';
import { EditarUsuarioComponent } from './admin/editar-usuario/editar-usuario.component';

const routes: Routes = [
  { path: '', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'dashboard', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'cadastrar-colaborador', component: CadastrarColaboradorComponent, canActivate: [AuthGuard] },
  { path: 'listar-colaborador', component: ListarColaboradorComponent, canActivate: [AuthGuard] },
  { path: 'cadastrar-empresa', component: CadastrarEmpresaComponent, canActivate: [AuthGuard] },
  { path: 'listar-empresa', component: ListarEmpresaComponent, canActivate: [AuthGuard] },
  { path: 'cadastrar-equipamento', component: CadastrarEquipamentoComponent, canActivate: [AuthGuard] },
  { path: 'listar-equipamento', component: ListarEquipamentosComponent, canActivate: [AuthGuard] },
  { path: 'detalhes-empresa/:id', component: DetalheEmpresaComponent, canActivate: [AuthGuard] },
  { path: 'cadastrar-tipo-equipamento', component: CadastrarTipoEquipamentoComponent, canActivate: [AuthGuard] },
  { path: 'listar-tipo-equipamento', component: ListarTipoEquipamentoComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'usuarioPermissoes', component: UsuarioPermissoesComponent, canActivate: [AuthGuard] },
  { path: 'permissoes/:id', component: PermissoesComponent, canActivate: [AuthGuard] },
  { path: 'criar-grupo-permissao', component: CriarGrupoPermissaoComponent, canActivate: [AuthGuard] },
  { path: 'cadastrar-usuario', component: CadastrarUsuarioComponent, canActivate: [AuthGuard] },
  { path: 'editar-usuario/:id', component: EditarUsuarioComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

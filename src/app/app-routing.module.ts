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
import { ConfirmaEmailComponent } from './admin/confirma-email/confirma-email.component';
import { BuscarEquipamentoComponent } from './authenticated/equipamentos/buscar-equipamento/buscar-equipamento.component';
import { DetalheEquipamentoComponent } from './authenticated/equipamentos/detalhe-equipamento/detalhe-equipamento.component';
import { TransfereEmpresaComponent } from './authenticated/equipamentos/transfere-empresa/transfere-empresa.component';
import { DetalheTipoEquipamentoComponent } from './authenticated/tipo-equipamento/detalhe-tipo-equipamento/detalhe-tipo-equipamento.component';
import { DetalheColaboradorComponent } from './authenticated/colaborador/detalhe-colaborador/detalhe-colaborador.component';
import { TransfereColaboradorComponent } from './authenticated/equipamentos/transfere-colaborador/transfere-colaborador.component';
import { TransfereSituacaoComponent } from './authenticated/equipamentos/transfere-situacao/transfere-situacao.component';
import { CadastrarSetorComponent } from './setor/cadastrar-setor/cadastrar-setor.component';
import { ListarSetorComponent } from './setor/listar-setor/listar-setor.component';
import { DetalheSetorComponent } from './setor/detalhe-setor/detalhe-setor.component';
import { EditarEquipamentosComponent } from './authenticated/equipamentos/editar-equipamentos/editar-equipamentos.component';
import { EditarColaboradorComponent } from './authenticated/colaborador/editar-colaborador/editar-colaborador.component';
import { EditarEmpresaComponent } from './authenticated/empresa/editar-empresa/editar-empresa.component';
import { EditarTipoEquipamentoComponent } from './authenticated/tipo-equipamento/editar-tipo-equipamento/editar-tipo-equipamento.component';
import { EditarSetorComponent } from './setor/editar-setor/editar-setor.component';
import { DuplicarEquipamentoComponent } from './authenticated/equipamento/duplicar-equipamento/duplicar-equipamento.component';
import { CadastrarCategoriaComponent } from './authenticated/categorias/cadastrar-categoria/cadastrar-categoria.component';
import { EditarCategoriaComponent } from './authenticated/categorias/editar-categoria/editar-categoria.component';
import { ListarCategoriaComponent } from './authenticated/categorias/listar-categoria/listar-categoria.component';
import { CadastrarItemComponent } from './authenticated/itens/cadastrar-item/cadastrar-item.component';
import { EditarItemComponent } from './authenticated/itens/editar-item/editar-item.component';
import { ListarItemComponent } from './authenticated/itens/listar-item/listar-item.component';
import { MovimentacaoItemComponent } from './authenticated/itens/movimentacao-item/movimentacao-item.component';
import { ListarMovimentacaoComponent } from './authenticated/itens/listar-movimentacao/listar-movimentacao.component';
import { ListarMovimentacaoItemComponent } from './authenticated/itens/listar-movimentacao-item/listar-movimentacao-item.component';
import { DuplicarItemComponent } from './authenticated/itens/duplicar-item/duplicar-item.component';


const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'dashboard', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'cadastrar-colaborador', component: CadastrarColaboradorComponent, canActivate: [AuthGuard] },
  { path: 'listar-colaborador', component: ListarColaboradorComponent, canActivate: [AuthGuard] },
  { path: 'cadastrar-empresa', component: CadastrarEmpresaComponent, canActivate: [AuthGuard] },
  { path: 'listar-empresa', component: ListarEmpresaComponent, canActivate: [AuthGuard] },
  { path: 'cadastrar-equipamento', component: CadastrarEquipamentoComponent, canActivate: [AuthGuard] },
  { path: 'listar-equipamento', component: ListarEquipamentosComponent, canActivate: [AuthGuard] },
  { path: 'buscar-equipamento', component: BuscarEquipamentoComponent, canActivate: [AuthGuard] },
  { path: 'detalhes-empresa/:id', component: DetalheEmpresaComponent, canActivate: [AuthGuard] },
  { path: 'cadastrar-tipo-equipamento', component: CadastrarTipoEquipamentoComponent, canActivate: [AuthGuard] },
  { path: 'listar-tipo-equipamento', component: ListarTipoEquipamentoComponent, canActivate: [AuthGuard] },
  { path: 'usuario-permissoes', component: UsuarioPermissoesComponent, canActivate: [AuthGuard] },
  { path: 'ver-permissoes/:id', component: PermissoesComponent, canActivate: [AuthGuard] },
  { path: 'criar-grupo-permissao', component: CriarGrupoPermissaoComponent, canActivate: [AuthGuard] },
  { path: 'cadastrar-usuario', component: CadastrarUsuarioComponent, canActivate: [AuthGuard] },
  { path: 'editar-usuario/:id', component: EditarUsuarioComponent, canActivate:[AuthGuard] },
  { path: 'confirmar-email', component: ConfirmaEmailComponent, canActivate: [AuthGuard] },
  { path: 'detalhe-equipamento/:id', component: DetalheEquipamentoComponent, canActivate: [AuthGuard] },
  { path: 'transfere-empresa', component: TransfereEmpresaComponent, canActivate:[AuthGuard] },
  { path: 'detalhe-tipo-equipamento/:id', component: DetalheTipoEquipamentoComponent, canActivate:[AuthGuard] },
  { path: 'detalhe-colaborador/:id', component: DetalheColaboradorComponent, canActivate:[AuthGuard] },
  { path: 'transfere-colaborador', component: TransfereColaboradorComponent, canActivate:[AuthGuard] },
  { path: 'altera-situacao', component: TransfereSituacaoComponent, canActivate:[AuthGuard] },
  { path: 'cadastrar-setor', component: CadastrarSetorComponent, canActivate:[AuthGuard] },
  { path: 'listar-setor', component: ListarSetorComponent, canActivate:[AuthGuard] },
  { path: 'detalhe-setor/:id', component: DetalheSetorComponent, canActivate:[AuthGuard] },
  { path: 'editar-equipamento/:id', component: EditarEquipamentosComponent, canActivate:[AuthGuard] },
  { path: 'editar-colaborador/:id', component: EditarColaboradorComponent, canActivate:[AuthGuard] },
  { path: 'editar-empresa/:id', component: EditarEmpresaComponent, canActivate:[AuthGuard] },
  { path: 'editar-tipo-equipamento/:id', component: EditarTipoEquipamentoComponent, canActivate:[AuthGuard] },
  { path: 'editar-setor/:id', component: EditarSetorComponent, canActivate:[AuthGuard] },
  { path: 'duplicar-equipamento/:id', component: DuplicarEquipamentoComponent, canActivate:[AuthGuard] },
  { path: 'cadastrar-categoria', component: CadastrarCategoriaComponent, canActivate:[AuthGuard] },
  { path: 'editar-categoria/:id', component: EditarCategoriaComponent, canActivate:[AuthGuard] },
  { path: 'listar-categoria', component: ListarCategoriaComponent, canActivate:[AuthGuard] },
  { path: 'cadastrar-item', component: CadastrarItemComponent, canActivate:[AuthGuard] },
  { path: 'editar-item/:id', component: EditarItemComponent, canActivate:[AuthGuard] },
  { path: 'listar-item', component: ListarItemComponent, canActivate:[AuthGuard] },
  { path: 'movimentacao', component: MovimentacaoItemComponent, canActivate:[AuthGuard] },
  { path: 'listar-movimentacao/:id', component: ListarMovimentacaoComponent, canActivate:[AuthGuard] },
  { path: 'listar-movimentacao-item', component: ListarMovimentacaoItemComponent, canActivate:[AuthGuard] },
  { path: 'duplicar-item/:id', component: DuplicarItemComponent, canActivate:[AuthGuard] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

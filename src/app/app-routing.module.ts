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

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'dashboard', component: HomeComponent },
  { path: 'cadastrar-colaborador', component: CadastrarColaboradorComponent },
  { path: 'listar-colaborador', component: ListarColaboradorComponent },
  { path: 'cadastrar-empresa', component: CadastrarEmpresaComponent },
  { path: 'listar-empresa', component: ListarEmpresaComponent },
  { path: 'cadastrar-equipamento', component: CadastrarEquipamentoComponent },
  { path: 'listar-equipamento', component: ListarEquipamentosComponent },
  { path: 'detalhes-empresa/:id', component: DetalheEmpresaComponent },
  { path: 'cadastrar-tipo-equipamento', component: CadastrarTipoEquipamentoComponent },
  { path: 'listar-tipo-equipamento', component: ListarTipoEquipamentoComponent },


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

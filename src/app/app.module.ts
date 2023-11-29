import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './authenticated/home/home.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';

import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatDividerModule } from '@angular/material/divider';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatButtonModule } from '@angular/material/button';
import { NgChartsModule } from 'ng2-charts';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatDialogModule } from '@angular/material/dialog';
import { MatMenuModule } from '@angular/material/menu';

import { CadastrarColaboradorComponent } from './authenticated/colaborador/cadastrar-colaborador/cadastrar-colaborador.component';
import { ListarColaboradorComponent } from './authenticated/colaborador/listar-colaborador/listar-colaborador.component';
import { CadastrarEmpresaComponent } from './authenticated/empresa/cadastrar-empresa/cadastrar-empresa.component';
import { ListarEmpresaComponent } from './authenticated/empresa/listar-empresa/listar-empresa.component';
import { CadastrarEquipamentoComponent } from './authenticated/equipamentos/cadastrar-equipamento/cadastrar-equipamento.component';
import { ListarEquipamentosComponent } from './authenticated/equipamentos/listar-equipamentos/listar-equipamentos.component';
import { EditarEquipamentosComponent } from './authenticated/equipamentos/editar-equipamentos/editar-equipamentos.component';
import { EditarColaboradorComponent } from './authenticated/colaborador/editar-colaborador/editar-colaborador.component';
import { EditarEmpresaComponent } from './authenticated/empresa/editar-empresa/editar-empresa.component';
import { DetalheEmpresaComponent } from './authenticated/empresa/detalhe-empresa/detalhe-empresa.component';
import { CadastrarTipoEquipamentoComponent } from './authenticated/tipo-equipamento/cadastrar-tipo-equipamento/cadastrar-tipo-equipamento.component';
import { ListarTipoEquipamentoComponent } from './authenticated/tipo-equipamento/listar-tipo-equipamento/listar-tipo-equipamento.component';
import { HttpClientModule } from '@angular/common/http';
import { ColaboradorService } from './authenticated/colaborador.service';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    CadastrarColaboradorComponent,
    ListarColaboradorComponent,
    CadastrarEmpresaComponent,
    ListarEmpresaComponent,
    CadastrarEquipamentoComponent,
    ListarEquipamentosComponent,
    EditarEquipamentosComponent,
    EditarColaboradorComponent,
    EditarEmpresaComponent,
    DetalheEmpresaComponent,
    CadastrarTipoEquipamentoComponent,
    ListarTipoEquipamentoComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatSidenavModule,
    MatIconModule,
    MatFormFieldModule,
    MatSelectModule,
    MatDividerModule,
    MatExpansionModule,
    MatButtonModule,
    NgChartsModule,
    FormsModule,
    MatSlideToggleModule,
    MatTableModule,
    MatPaginatorModule,
    MatDialogModule,
    MatMenuModule,
    HttpClientModule,
  ],
  providers: [
    ColaboradorService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

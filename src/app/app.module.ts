import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './authenticated/home/home.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

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
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MAT_DATE_LOCALE, MatNativeDateModule } from '@angular/material/core';
import { MatSnackBarModule, MAT_SNACK_BAR_DEFAULT_OPTIONS } from '@angular/material/snack-bar';
import { MatTabsModule } from '@angular/material/tabs';
import { MatCardModule } from '@angular/material/card';

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
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { ColaboradorService } from './authenticated/colaborador.service';
import { LoginComponent } from './authenticate/login/login.component';
import { NotificationComponent } from './util/notification/notification.component';
import { AuthInterceptor } from './authenticate/login/auth.interceptor';
import { JwtModule } from '@auth0/angular-jwt';
import { PermissoesComponent } from './admin/permissoes/permissoes.component';
import { CadastrarUsuarioComponent } from './admin/cadastrar-usuario/cadastrar-usuario.component';
import { EditarUsuarioComponent } from './admin/editar-usuario/editar-usuario.component';
import { UsuarioPermissoesComponent } from './admin/usuario-permissoes/usuario-permissoes.component';
import { PermissaodetalhesComponent } from './admin/permissaodetalhes/permissaodetalhes.component';
import { CriarGrupoPermissaoComponent } from './admin/criar-grupo-permissao/criar-grupo-permissao.component';
import { ConfirmaEmailComponent } from './admin/confirma-email/confirma-email.component';
import { AdicionarEquipamentoComponent } from './authenticated/empresa/adicionar-equipamento/adicionar-equipamento.component';
import { UrlService } from './util/url.service';
import { NgxMaskModule } from 'ngx-mask-2';
import { BuscarEquipamentoComponent } from './authenticated/equipamentos/buscar-equipamento/buscar-equipamento.component';
import { DatePipe } from '@angular/common';
import { DetalheEquipamentoComponent } from './authenticated/equipamentos/detalhe-equipamento/detalhe-equipamento.component';
import { TransfereEmpresaComponent } from './authenticated/equipamentos/transfere-empresa/transfere-empresa.component';
import { DetalheTipoEquipamentoComponent } from './authenticated/tipo-equipamento/detalhe-tipo-equipamento/detalhe-tipo-equipamento.component';
import { DetalheColaboradorComponent } from './authenticated/colaborador/detalhe-colaborador/detalhe-colaborador.component';
import { TransfereColaboradorComponent } from './authenticated/equipamentos/transfere-colaborador/transfere-colaborador.component';
import { TransfereSituacaoComponent } from './authenticated/equipamentos/transfere-situacao/transfere-situacao.component';
import { CadastrarSetorComponent } from './setor/cadastrar-setor/cadastrar-setor.component';
import { ListarSetorComponent } from './setor/listar-setor/listar-setor.component';
import { DetalheSetorComponent } from './setor/detalhe-setor/detalhe-setor.component';
import { EditarTipoEquipamentoComponent } from './authenticated/tipo-equipamento/editar-tipo-equipamento/editar-tipo-equipamento.component';
import { EditarSetorComponent } from './setor/editar-setor/editar-setor.component';
import { DuplicarEquipamentoComponent } from './authenticated/equipamento/duplicar-equipamento/duplicar-equipamento.component';
import { EquipamentosPorTipoComponent } from './util/equipamentos-por-tipo/equipamentos-por-tipo.component';
import { CadastrarCategoriaComponent } from './authenticated/categorias/cadastrar-categoria/cadastrar-categoria.component';
import { EditarCategoriaComponent } from './authenticated/categorias/editar-categoria/editar-categoria.component';
import { ListarCategoriaComponent } from './authenticated/categorias/listar-categoria/listar-categoria.component';
import { CadastrarItemComponent } from './authenticated/itens/cadastrar-item/cadastrar-item.component';
import { ListarItemComponent } from './authenticated/itens/listar-item/listar-item.component';
import { EditarItemComponent } from './authenticated/itens/editar-item/editar-item.component';


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
    LoginComponent,
    NotificationComponent,
    PermissoesComponent,
    CadastrarUsuarioComponent,
    EditarUsuarioComponent,
    UsuarioPermissoesComponent,
    PermissaodetalhesComponent,
    CriarGrupoPermissaoComponent,
    ConfirmaEmailComponent,
    AdicionarEquipamentoComponent,
    BuscarEquipamentoComponent,
    DetalheEquipamentoComponent,
    TransfereEmpresaComponent,
    DetalheTipoEquipamentoComponent,
    DetalheColaboradorComponent,
    TransfereColaboradorComponent,
    TransfereSituacaoComponent,
    CadastrarSetorComponent,
    ListarSetorComponent,
    DetalheSetorComponent,
    EditarTipoEquipamentoComponent,
    EditarSetorComponent,
    DuplicarEquipamentoComponent,
    EquipamentosPorTipoComponent,
    CadastrarCategoriaComponent,
    EditarCategoriaComponent,
    ListarCategoriaComponent,
    CadastrarItemComponent,
    ListarItemComponent,
    EditarItemComponent,
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
    ReactiveFormsModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: () => localStorage.getItem('access_token'), // Função para obter o token do armazenamento local
      },
    }),
    MatCheckboxModule,
    MatToolbarModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    NgxMaskModule.forRoot(),
    MatSnackBarModule,
    MatTabsModule,
    MatCardModule
  ],
  providers: [
    ColaboradorService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true, // Permite que existam vários interceptors
    },
    UrlService,
    { provide: MAT_DATE_LOCALE, useValue: 'pt-BR' },
    DatePipe,
    {
      provide: MAT_SNACK_BAR_DEFAULT_OPTIONS,
      useValue: { panelClass: ['custom-snackbar'] },
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

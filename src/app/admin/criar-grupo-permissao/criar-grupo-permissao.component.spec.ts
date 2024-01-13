import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CriarGrupoPermissaoComponent } from './criar-grupo-permissao.component';

describe('CriarGrupoPermissaoComponent', () => {
  let component: CriarGrupoPermissaoComponent;
  let fixture: ComponentFixture<CriarGrupoPermissaoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CriarGrupoPermissaoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CriarGrupoPermissaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

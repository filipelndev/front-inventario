import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsuarioPermissoesComponent } from './usuario-permissoes.component';

describe('UsuarioPermissoesComponent', () => {
  let component: UsuarioPermissoesComponent;
  let fixture: ComponentFixture<UsuarioPermissoesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UsuarioPermissoesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UsuarioPermissoesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

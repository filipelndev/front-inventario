import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CadastrarTipoEquipamentoComponent } from './cadastrar-tipo-equipamento.component';

describe('CadastrarTipoEquipamentoComponent', () => {
  let component: CadastrarTipoEquipamentoComponent;
  let fixture: ComponentFixture<CadastrarTipoEquipamentoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CadastrarTipoEquipamentoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CadastrarTipoEquipamentoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

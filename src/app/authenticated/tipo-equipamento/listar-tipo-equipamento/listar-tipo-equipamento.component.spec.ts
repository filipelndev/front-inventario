import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListarTipoEquipamentoComponent } from './listar-tipo-equipamento.component';

describe('ListarTipoEquipamentoComponent', () => {
  let component: ListarTipoEquipamentoComponent;
  let fixture: ComponentFixture<ListarTipoEquipamentoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListarTipoEquipamentoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListarTipoEquipamentoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

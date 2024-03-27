import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarTipoEquipamentoComponent } from './editar-tipo-equipamento.component';

describe('EditarTipoEquipamentoComponent', () => {
  let component: EditarTipoEquipamentoComponent;
  let fixture: ComponentFixture<EditarTipoEquipamentoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditarTipoEquipamentoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditarTipoEquipamentoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

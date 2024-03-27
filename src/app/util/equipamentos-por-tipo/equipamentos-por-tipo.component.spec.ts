import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EquipamentosPorTipoComponent } from './equipamentos-por-tipo.component';

describe('EquipamentosPorTipoComponent', () => {
  let component: EquipamentosPorTipoComponent;
  let fixture: ComponentFixture<EquipamentosPorTipoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EquipamentosPorTipoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EquipamentosPorTipoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuscarEquipamentoComponent } from './buscar-equipamento.component';

describe('BuscarEquipamentoComponent', () => {
  let component: BuscarEquipamentoComponent;
  let fixture: ComponentFixture<BuscarEquipamentoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BuscarEquipamentoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BuscarEquipamentoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

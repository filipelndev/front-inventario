import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalheEquipamentoComponent } from './detalhe-equipamento.component';

describe('DetalheEquipamentoComponent', () => {
  let component: DetalheEquipamentoComponent;
  let fixture: ComponentFixture<DetalheEquipamentoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetalheEquipamentoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetalheEquipamentoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

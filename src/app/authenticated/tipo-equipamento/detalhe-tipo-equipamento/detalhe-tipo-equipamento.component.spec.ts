import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalheTipoEquipamentoComponent } from './detalhe-tipo-equipamento.component';

describe('DetalheTipoEquipamentoComponent', () => {
  let component: DetalheTipoEquipamentoComponent;
  let fixture: ComponentFixture<DetalheTipoEquipamentoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetalheTipoEquipamentoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetalheTipoEquipamentoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

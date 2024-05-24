import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DuplicarEquipamentoComponent } from './duplicar-equipamento.component';

describe('DuplicarEquipamentoComponent', () => {
  let component: DuplicarEquipamentoComponent;
  let fixture: ComponentFixture<DuplicarEquipamentoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DuplicarEquipamentoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DuplicarEquipamentoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

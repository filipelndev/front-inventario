import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarEquipamentosComponent } from './editar-equipamentos.component';

describe('EditarEquipamentosComponent', () => {
  let component: EditarEquipamentosComponent;
  let fixture: ComponentFixture<EditarEquipamentosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditarEquipamentosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditarEquipamentosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

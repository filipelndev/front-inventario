import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListarSetorComponent } from './listar-setor.component';

describe('ListarSetorComponent', () => {
  let component: ListarSetorComponent;
  let fixture: ComponentFixture<ListarSetorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListarSetorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListarSetorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

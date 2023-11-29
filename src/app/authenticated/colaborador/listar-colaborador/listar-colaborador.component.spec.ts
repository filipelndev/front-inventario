import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListarColaboradorComponent } from '../../equipamentos/cadastrar-equipamento/cadastrar-equipamento.component';

describe('ListarColaboradorComponent', () => {
  let component: ListarColaboradorComponent;
  let fixture: ComponentFixture<ListarColaboradorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListarColaboradorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListarColaboradorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

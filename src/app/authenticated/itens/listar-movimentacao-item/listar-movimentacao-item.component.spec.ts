import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListarMovimentacaoItemComponent } from './listar-movimentacao-item.component';

describe('ListarMovimentacaoItemComponent', () => {
  let component: ListarMovimentacaoItemComponent;
  let fixture: ComponentFixture<ListarMovimentacaoItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListarMovimentacaoItemComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListarMovimentacaoItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

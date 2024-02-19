import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransfereSituacaoComponent } from './transfere-situacao.component';

describe('TransfereSituacaoComponent', () => {
  let component: TransfereSituacaoComponent;
  let fixture: ComponentFixture<TransfereSituacaoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TransfereSituacaoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TransfereSituacaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

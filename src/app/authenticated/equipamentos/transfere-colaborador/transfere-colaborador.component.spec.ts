import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransfereColaboradorComponent } from './transfere-colaborador.component';

describe('TransfereColaboradorComponent', () => {
  let component: TransfereColaboradorComponent;
  let fixture: ComponentFixture<TransfereColaboradorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TransfereColaboradorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TransfereColaboradorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

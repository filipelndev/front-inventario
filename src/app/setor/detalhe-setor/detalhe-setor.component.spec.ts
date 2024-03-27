import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalheSetorComponent } from './detalhe-setor.component';

describe('DetalheSetorComponent', () => {
  let component: DetalheSetorComponent;
  let fixture: ComponentFixture<DetalheSetorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetalheSetorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetalheSetorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

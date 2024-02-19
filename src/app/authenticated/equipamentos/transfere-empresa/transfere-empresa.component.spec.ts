import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransfereEmpresaComponent } from './transfere-empresa.component';

describe('TransfereEmpresaComponent', () => {
  let component: TransfereEmpresaComponent;
  let fixture: ComponentFixture<TransfereEmpresaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TransfereEmpresaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TransfereEmpresaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

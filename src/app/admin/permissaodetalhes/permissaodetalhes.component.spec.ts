import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PermissaodetalhesComponent } from './permissaodetalhes.component';

describe('PermissaodetalhesComponent', () => {
  let component: PermissaodetalhesComponent;
  let fixture: ComponentFixture<PermissaodetalhesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PermissaodetalhesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PermissaodetalhesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

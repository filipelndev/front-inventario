import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DuplicarItemComponent } from './duplicar-item.component';

describe('DuplicarItemComponent', () => {
  let component: DuplicarItemComponent;
  let fixture: ComponentFixture<DuplicarItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DuplicarItemComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DuplicarItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

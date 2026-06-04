import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PreciosComponent } from './precios.component';

describe('PreciosComponent', () => {
  let component: PreciosComponent;
  let fixture: ComponentFixture<PreciosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PreciosComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(PreciosComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

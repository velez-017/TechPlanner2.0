import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistroComponente } from './precios.component';

describe('RegistroComponente', () => {
  let component: RegistroComponente;
  let fixture: ComponentFixture<RegistroComponente>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegistroComponente],
    }).compileComponents();

    fixture = TestBed.createComponent(RegistroComponente);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

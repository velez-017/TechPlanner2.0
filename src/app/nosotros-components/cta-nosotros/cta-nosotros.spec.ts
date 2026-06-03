import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CtaNosotros } from './cta-nosotros';

describe('CtaNosotros', () => {
  let component: CtaNosotros;
  let fixture: ComponentFixture<CtaNosotros>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CtaNosotros],
    }).compileComponents();

    fixture = TestBed.createComponent(CtaNosotros);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

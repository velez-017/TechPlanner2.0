import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StatsNosotros } from './stats-nosotros';

describe('StatsNosotros', () => {
  let component: StatsNosotros;
  let fixture: ComponentFixture<StatsNosotros>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StatsNosotros],
    }).compileComponents();

    fixture = TestBed.createComponent(StatsNosotros);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

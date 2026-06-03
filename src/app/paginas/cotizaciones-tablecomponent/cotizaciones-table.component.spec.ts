import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CotizacionesTableComponent } from './cotizaciones-table.component';

describe('CotizacionesTableComponent', () => {
  let component: CotizacionesTableComponent;
  let fixture: ComponentFixture<CotizacionesTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CotizacionesTableComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CotizacionesTableComponent);
    component = fixture.componentInstance;

    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

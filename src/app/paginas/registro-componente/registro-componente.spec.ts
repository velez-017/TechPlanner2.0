import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { RegistroComponente } from './registro-componente';

describe('RegistroComponente', () => {
  let component: RegistroComponente;
  let fixture: ComponentFixture<RegistroComponente>;
  let httpMock: HttpTestingController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RegistroComponente],
    }).compileComponents();

    fixture = TestBed.createComponent(RegistroComponente);
    component = fixture.componentInstance;
    httpMock = TestBed.inject(HttpTestingController);
    fixture.detectChanges();
    const request = httpMock.expectOne('http://localhost:8083/api/v1/component-service/components');
    expect(request.request.method).toBe('GET');
    request.flush([
      { id: 1, brand: 'Intel', model: 'i7', price: 1200 },
    ]);
    await fixture.whenStable();
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

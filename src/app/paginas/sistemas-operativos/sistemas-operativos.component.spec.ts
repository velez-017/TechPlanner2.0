import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SistemasOperativosComponent } from './sistemas-operativos.component';

describe('SistemasOperativosComponent', () => {
  let component: SistemasOperativosComponent;
  let fixture: ComponentFixture<SistemasOperativosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SistemasOperativosComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SistemasOperativosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

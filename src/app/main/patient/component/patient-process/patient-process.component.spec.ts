import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientProcessComponent } from './patient-process.component';

describe('PatientProcessComponent', () => {
  let component: PatientProcessComponent;
  let fixture: ComponentFixture<PatientProcessComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PatientProcessComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PatientProcessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});

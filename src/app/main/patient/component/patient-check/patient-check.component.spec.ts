import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientCheckComponent } from './patient-check.component';

describe('PatientCheckComponent', () => {
  let component: PatientCheckComponent;
  let fixture: ComponentFixture<PatientCheckComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PatientCheckComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PatientCheckComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});

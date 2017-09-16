import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientBookingComponent } from './patient-booking.component';

describe('PatientBookingComponent', () => {
  let component: PatientBookingComponent;
  let fixture: ComponentFixture<PatientBookingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PatientBookingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PatientBookingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});

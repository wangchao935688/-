import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OutpatientBookingLossReportComponent } from './outpatient-booking-loss-report.component';

describe('OutpatientBookingLossReportComponent', () => {
  let component: OutpatientBookingLossReportComponent;
  let fixture: ComponentFixture<OutpatientBookingLossReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OutpatientBookingLossReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OutpatientBookingLossReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});

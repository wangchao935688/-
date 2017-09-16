import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OutpatientPatientSourceReportComponent } from './outpatient-patient-source-report.component';

describe('OutpatientPatientSourceReportComponent', () => {
  let component: OutpatientPatientSourceReportComponent;
  let fixture: ComponentFixture<OutpatientPatientSourceReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OutpatientPatientSourceReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OutpatientPatientSourceReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkloadDoctorReportComponent } from './workload-doctor-report.component';

describe('WorkloadDoctorReportComponent', () => {
  let component: WorkloadDoctorReportComponent;
  let fixture: ComponentFixture<WorkloadDoctorReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WorkloadDoctorReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkloadDoctorReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});

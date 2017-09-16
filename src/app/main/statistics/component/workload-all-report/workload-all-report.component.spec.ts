import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkloadAllReportComponent } from './workload-all-report.component';

describe('WorkloadAllReportComponent', () => {
  let component: WorkloadAllReportComponent;
  let fixture: ComponentFixture<WorkloadAllReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WorkloadAllReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkloadAllReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});

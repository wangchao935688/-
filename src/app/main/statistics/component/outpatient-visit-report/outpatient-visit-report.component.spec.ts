import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OutpatientVisitReportComponent } from './outpatient-visit-report.component';

describe('OutpatientVisitReportComponent', () => {
  let component: OutpatientVisitReportComponent;
  let fixture: ComponentFixture<OutpatientVisitReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OutpatientVisitReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OutpatientVisitReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});

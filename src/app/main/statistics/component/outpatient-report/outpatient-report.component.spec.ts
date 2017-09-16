import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OutpatientReportComponent } from './outpatient-report.component';

describe('OutpatientReportComponent', () => {
  let component: OutpatientReportComponent;
  let fixture: ComponentFixture<OutpatientReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OutpatientReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OutpatientReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});

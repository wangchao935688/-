import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OutpatientFirstReturnReportComponent } from './outpatient-first-return-report.component';

describe('OutpatientFirstReturnReportComponent', () => {
  let component: OutpatientFirstReturnReportComponent;
  let fixture: ComponentFixture<OutpatientFirstReturnReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OutpatientFirstReturnReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OutpatientFirstReturnReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});

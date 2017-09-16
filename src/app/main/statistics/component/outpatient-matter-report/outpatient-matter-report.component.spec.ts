import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OutpatientMatterReportComponent } from './outpatient-matter-report.component';

describe('OutpatientMatterReportComponent', () => {
  let component: OutpatientMatterReportComponent;
  let fixture: ComponentFixture<OutpatientMatterReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OutpatientMatterReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OutpatientMatterReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});

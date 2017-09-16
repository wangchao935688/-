import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OutpatientReportIndexComponent } from './outpatient-report-index.component';

describe('OutpatientReportIndexComponent', () => {
  let component: OutpatientReportIndexComponent;
  let fixture: ComponentFixture<OutpatientReportIndexComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OutpatientReportIndexComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OutpatientReportIndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});

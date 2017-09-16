import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CapitalFlowReportComponent } from './capital-flow-report.component';

describe('CapitalFlowReportComponent', () => {
  let component: CapitalFlowReportComponent;
  let fixture: ComponentFixture<CapitalFlowReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CapitalFlowReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CapitalFlowReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});

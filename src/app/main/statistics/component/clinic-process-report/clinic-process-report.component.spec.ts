import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClinicProcessReportComponent } from './clinic-process-report.component';

describe('ClinicProcessReportComponent', () => {
  let component: ClinicProcessReportComponent;
  let fixture: ComponentFixture<ClinicProcessReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClinicProcessReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClinicProcessReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});

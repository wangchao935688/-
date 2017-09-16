import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DoctorProcessReportComponent } from './doctor-process-report.component';

describe('DoctorProcessReportComponent', () => {
  let component: DoctorProcessReportComponent;
  let fixture: ComponentFixture<DoctorProcessReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DoctorProcessReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DoctorProcessReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});

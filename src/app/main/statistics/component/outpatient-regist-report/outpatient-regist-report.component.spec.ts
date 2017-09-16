import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OutpatientRegistReportComponent } from './outpatient-regist-report.component';

describe('OutpatientRegistReportComponent', () => {
  let component: OutpatientRegistReportComponent;
  let fixture: ComponentFixture<OutpatientRegistReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OutpatientRegistReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OutpatientRegistReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});

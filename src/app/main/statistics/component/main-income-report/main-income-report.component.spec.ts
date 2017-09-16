import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MainIncomeReportComponent } from './main-income-report.component';

describe('MainIncomeReportComponent', () => {
  let component: MainIncomeReportComponent;
  let fixture: ComponentFixture<MainIncomeReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MainIncomeReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MainIncomeReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});

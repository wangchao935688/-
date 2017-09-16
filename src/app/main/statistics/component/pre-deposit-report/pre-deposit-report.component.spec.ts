import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PreDepositReportComponent } from './pre-deposit-report.component';

describe('PreDepositReportComponent', () => {
  let component: PreDepositReportComponent;
  let fixture: ComponentFixture<PreDepositReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PreDepositReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PreDepositReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});

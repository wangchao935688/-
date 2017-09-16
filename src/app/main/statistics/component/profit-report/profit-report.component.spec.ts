import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfitReportComponent } from './profit-report.component';

describe('ProfitReportComponent', () => {
  let component: ProfitReportComponent;
  let fixture: ComponentFixture<ProfitReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfitReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfitReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});

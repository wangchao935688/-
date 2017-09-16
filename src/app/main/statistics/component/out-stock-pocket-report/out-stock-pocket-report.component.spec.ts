import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OutStockPocketReportComponent } from './out-stock-pocket-report.component';

describe('OutStockPocketReportComponent', () => {
  let component: OutStockPocketReportComponent;
  let fixture: ComponentFixture<OutStockPocketReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OutStockPocketReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OutStockPocketReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});

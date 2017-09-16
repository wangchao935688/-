import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OutStockReportComponent } from './out-stock-report.component';

describe('OutStockReportComponent', () => {
  let component: OutStockReportComponent;
  let fixture: ComponentFixture<OutStockReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OutStockReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OutStockReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});

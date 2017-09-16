import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InStockSupplyReportComponent } from './in-stock-supply-report.component';

describe('InStockSupplyReportComponent', () => {
  let component: InStockSupplyReportComponent;
  let fixture: ComponentFixture<InStockSupplyReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InStockSupplyReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InStockSupplyReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InStockReportIndexComponent } from './in-stock-report-index.component';

describe('InStockReportIndexComponent', () => {
  let component: InStockReportIndexComponent;
  let fixture: ComponentFixture<InStockReportIndexComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InStockReportIndexComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InStockReportIndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});

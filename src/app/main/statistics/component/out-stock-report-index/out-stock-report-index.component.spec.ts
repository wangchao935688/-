import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OutStockComponent } from './out-stock-report-index.component';

describe('OutStockComponent', () => {
  let component: OutStockComponent;
  let fixture: ComponentFixture<OutStockComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OutStockComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OutStockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OutputStockQueryComponent } from './output-stock-query.component';

describe('OutputStockQueryComponent', () => {
  let component: OutputStockQueryComponent;
  let fixture: ComponentFixture<OutputStockQueryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OutputStockQueryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OutputStockQueryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});

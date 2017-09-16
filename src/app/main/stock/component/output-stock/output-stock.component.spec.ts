import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OutputStockComponent } from './output-stock.component';

describe('OutputStockComponent', () => {
  let component: OutputStockComponent;
  let fixture: ComponentFixture<OutputStockComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OutputStockComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OutputStockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});

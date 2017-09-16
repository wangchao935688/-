import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InputStockQueryComponent } from './input-stock-query.component';

describe('InputStockQueryComponent', () => {
  let component: InputStockQueryComponent;
  let fixture: ComponentFixture<InputStockQueryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InputStockQueryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InputStockQueryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});

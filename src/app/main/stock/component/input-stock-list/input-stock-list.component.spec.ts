import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InputStockListComponent } from './input-stock-list.component';

describe('InputStockListComponent', () => {
  let component: InputStockListComponent;
  let fixture: ComponentFixture<InputStockListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InputStockListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InputStockListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});

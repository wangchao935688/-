import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OutputStockListComponent } from './output-stock-list.component';

describe('OutputStockListComponent', () => {
  let component: OutputStockListComponent;
  let fixture: ComponentFixture<OutputStockListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OutputStockListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OutputStockListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});

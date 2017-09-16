import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateEditOutputStockComponent } from './create-edit-output-stock.component';

describe('CreateEditOutputStockComponent', () => {
  let component: CreateEditOutputStockComponent;
  let fixture: ComponentFixture<CreateEditOutputStockComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateEditOutputStockComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateEditOutputStockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});

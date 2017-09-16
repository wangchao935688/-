import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateEditInputStockComponent } from './create-edit-input-stock.component';

describe('CreateEditInputStockComponent', () => {
  let component: CreateEditInputStockComponent;
  let fixture: ComponentFixture<CreateEditInputStockComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateEditInputStockComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateEditInputStockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});

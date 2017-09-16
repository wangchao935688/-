import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateEditReturnStockComponent } from './create-edit-return-stock.component';

describe('CreateEditReturnStockComponent', () => {
  let component: CreateEditReturnStockComponent;
  let fixture: ComponentFixture<CreateEditReturnStockComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateEditReturnStockComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateEditReturnStockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});

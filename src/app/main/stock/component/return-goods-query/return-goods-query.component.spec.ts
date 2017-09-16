import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReturnGoodsQueryComponent } from './return-goods-query.component';

describe('ReturnGoodsQueryComponent', () => {
  let component: ReturnGoodsQueryComponent;
  let fixture: ComponentFixture<ReturnGoodsQueryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReturnGoodsQueryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReturnGoodsQueryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});

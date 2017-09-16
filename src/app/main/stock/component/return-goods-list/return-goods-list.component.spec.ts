import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReturnGoodsListComponent } from './return-goods-list.component';

describe('ReturnGoodsListComponent', () => {
  let component: ReturnGoodsListComponent;
  let fixture: ComponentFixture<ReturnGoodsListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReturnGoodsListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReturnGoodsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectGoodsComponent } from './select-goods.component';

describe('SelectGoodsComponent', () => {
  let component: SelectGoodsComponent;
  let fixture: ComponentFixture<SelectGoodsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelectGoodsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectGoodsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});

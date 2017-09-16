import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateEditGoodsComponent } from './create-edit-goods.component';

describe('CreateEditGoodsComponent', () => {
  let component: CreateEditGoodsComponent;
  let fixture: ComponentFixture<CreateEditGoodsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateEditGoodsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateEditGoodsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});

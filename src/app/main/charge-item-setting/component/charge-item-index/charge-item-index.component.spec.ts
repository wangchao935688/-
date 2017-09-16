import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChargeItemIndexComponent } from './charge-item-index.component';

describe('ChargeItemIndexComponent', () => {
  let component: ChargeItemIndexComponent;
  let fixture: ComponentFixture<ChargeItemIndexComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChargeItemIndexComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChargeItemIndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});

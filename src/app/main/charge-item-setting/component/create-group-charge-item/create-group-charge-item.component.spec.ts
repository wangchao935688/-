import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateGroupChargeItemComponent } from './create-group-charge-item.component';

describe('CreateGroupChargeItemComponent', () => {
  let component: CreateGroupChargeItemComponent;
  let fixture: ComponentFixture<CreateGroupChargeItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateGroupChargeItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateGroupChargeItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});

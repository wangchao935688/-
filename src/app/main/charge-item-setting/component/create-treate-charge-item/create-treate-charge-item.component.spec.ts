import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateTreateChargeItemComponent } from './create-treate-charge-item.component';

describe('CreateTreateChargeItemComponent', () => {
  let component: CreateTreateChargeItemComponent;
  let fixture: ComponentFixture<CreateTreateChargeItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateTreateChargeItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateTreateChargeItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});

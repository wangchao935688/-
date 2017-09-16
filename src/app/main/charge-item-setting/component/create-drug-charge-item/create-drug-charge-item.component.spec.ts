import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateDrugChargeItemComponent } from './create-drug-charge-item.component';

describe('CreateDrugChargeItemComponent', () => {
  let component: CreateDrugChargeItemComponent;
  let fixture: ComponentFixture<CreateDrugChargeItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateDrugChargeItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateDrugChargeItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});

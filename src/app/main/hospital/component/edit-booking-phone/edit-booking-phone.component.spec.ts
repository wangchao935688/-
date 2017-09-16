import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditBookingPhoneComponent } from './edit-booking-phone.component';

describe('EditBookingPhoneComponent', () => {
  let component: EditBookingPhoneComponent;
  let fixture: ComponentFixture<EditBookingPhoneComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditBookingPhoneComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditBookingPhoneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SmsRecordComponent } from './sms-record.component';

describe('SmsRecordComponent', () => {
  let component: SmsRecordComponent;
  let fixture: ComponentFixture<SmsRecordComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SmsRecordComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SmsRecordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});

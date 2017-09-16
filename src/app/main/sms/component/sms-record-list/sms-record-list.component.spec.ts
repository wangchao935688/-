import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SmsRecordListComponent } from './sms-record-list.component';

describe('SmsRecordListComponent', () => {
  let component: SmsRecordListComponent;
  let fixture: ComponentFixture<SmsRecordListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SmsRecordListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SmsRecordListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});

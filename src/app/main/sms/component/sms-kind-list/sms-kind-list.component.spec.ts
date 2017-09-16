import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SmsKindListComponent } from './sms-kind-list.component';

describe('SmsKindListComponent', () => {
  let component: SmsKindListComponent;
  let fixture: ComponentFixture<SmsKindListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SmsKindListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SmsKindListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});

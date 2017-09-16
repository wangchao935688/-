import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SmsSendRuleComponent } from './sms-send-rule.component';

describe('SmsSendRuleComponent', () => {
  let component: SmsSendRuleComponent;
  let fixture: ComponentFixture<SmsSendRuleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SmsSendRuleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SmsSendRuleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});

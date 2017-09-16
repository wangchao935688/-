import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RechargeSmsStepComponent } from './recharge-sms-step.component';

describe('RechargeSmsStepComponent', () => {
  let component: RechargeSmsStepComponent;
  let fixture: ComponentFixture<RechargeSmsStepComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RechargeSmsStepComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RechargeSmsStepComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});

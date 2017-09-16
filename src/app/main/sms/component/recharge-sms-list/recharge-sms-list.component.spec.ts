import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RechargeSmsListComponent } from './recharge-sms-list.component';

describe('RechargeSmsListComponent', () => {
  let component: RechargeSmsListComponent;
  let fixture: ComponentFixture<RechargeSmsListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RechargeSmsListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RechargeSmsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});

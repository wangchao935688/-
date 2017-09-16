import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LowVolumeAlarmComponent } from './low-volume-alarm.component';

describe('LowVolumeAlarmComponent', () => {
  let component: LowVolumeAlarmComponent;
  let fixture: ComponentFixture<LowVolumeAlarmComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LowVolumeAlarmComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LowVolumeAlarmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});

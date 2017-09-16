import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReplySmsComponent } from './reply-sms.component';

describe('ReplySmsComponent', () => {
  let component: ReplySmsComponent;
  let fixture: ComponentFixture<ReplySmsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReplySmsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReplySmsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});

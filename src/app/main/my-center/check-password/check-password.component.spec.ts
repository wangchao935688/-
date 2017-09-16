import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckPasswordComponent } from './check-password.component';

describe('CheckPasswordComponent', () => {
  let component: CheckPasswordComponent;
  let fixture: ComponentFixture<CheckPasswordComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CheckPasswordComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CheckPasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});

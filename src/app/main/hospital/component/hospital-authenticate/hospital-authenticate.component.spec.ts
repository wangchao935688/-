import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HospitalAuthenticateComponent } from './hospital-authenticate.component';

describe('HospitalAuthenticateComponent', () => {
  let component: HospitalAuthenticateComponent;
  let fixture: ComponentFixture<HospitalAuthenticateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HospitalAuthenticateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HospitalAuthenticateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientOptionsComponent } from './patient-options.component';

describe('PatientOptionsComponent', () => {
  let component: PatientOptionsComponent;
  let fixture: ComponentFixture<PatientOptionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PatientOptionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PatientOptionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});

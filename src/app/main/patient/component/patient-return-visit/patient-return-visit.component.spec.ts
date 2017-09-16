import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientReturnVisitComponent } from './patient-return-visit.component';

describe('PatientReturnVisitComponent', () => {
  let component: PatientReturnVisitComponent;
  let fixture: ComponentFixture<PatientReturnVisitComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PatientReturnVisitComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PatientReturnVisitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});

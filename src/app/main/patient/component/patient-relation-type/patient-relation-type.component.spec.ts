import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientRelationTypeComponent } from './patient-relation-type.component';

describe('PatientRelationTypeComponent', () => {
  let component: PatientRelationTypeComponent;
  let fixture: ComponentFixture<PatientRelationTypeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PatientRelationTypeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PatientRelationTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});

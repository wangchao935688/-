import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactPatientListComponent } from './contact-patient-list.component';

describe('ContactPatientListComponent', () => {
  let component: ContactPatientListComponent;
  let fixture: ComponentFixture<ContactPatientListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContactPatientListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContactPatientListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectDoctorTemplatesComponent } from './select-doctor-templates.component';

describe('SelectDoctorTemplatesComponent', () => {
  let component: SelectDoctorTemplatesComponent;
  let fixture: ComponentFixture<SelectDoctorTemplatesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelectDoctorTemplatesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectDoctorTemplatesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});

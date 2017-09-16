import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateEditMedicalComponent } from './create-edit-medical.component';

describe('CreateEditMedicalComponent', () => {
  let component: CreateEditMedicalComponent;
  let fixture: ComponentFixture<CreateEditMedicalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateEditMedicalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateEditMedicalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});

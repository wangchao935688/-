import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QiezziPatientLabelSelectComponent } from './qiezzi-patient-label-select.component';

describe('QiezziPatientLabelSelectComponent', () => {
  let component: QiezziPatientLabelSelectComponent;
  let fixture: ComponentFixture<QiezziPatientLabelSelectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QiezziPatientLabelSelectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QiezziPatientLabelSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});

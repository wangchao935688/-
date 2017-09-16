import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HospitalIndexComponent } from './hospital-index.component';

describe('HospitalIndexComponent', () => {
  let component: HospitalIndexComponent;
  let fixture: ComponentFixture<HospitalIndexComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HospitalIndexComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HospitalIndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});

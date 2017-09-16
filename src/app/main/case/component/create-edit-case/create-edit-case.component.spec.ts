import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateEditCaseComponent } from './create-edit-case.component';

describe('CreateEditCaseComponent', () => {
  let component: CreateEditCaseComponent;
  let fixture: ComponentFixture<CreateEditCaseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateEditCaseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateEditCaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateEditDisinfectionComponent } from './create-edit-disinfection.component';

describe('CreateEditDisinfectionComponent', () => {
  let component: CreateEditDisinfectionComponent;
  let fixture: ComponentFixture<CreateEditDisinfectionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateEditDisinfectionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateEditDisinfectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});

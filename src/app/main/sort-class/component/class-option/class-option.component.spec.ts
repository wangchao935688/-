import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClassOptionComponent } from './class-option.component';

describe('ClassOptionComponent', () => {
  let component: ClassOptionComponent;
  let fixture: ComponentFixture<ClassOptionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClassOptionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClassOptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});

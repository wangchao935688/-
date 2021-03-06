import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateOptionComponent } from './create-option.component';

describe('CreateOptionComponent', () => {
  let component: CreateOptionComponent;
  let fixture: ComponentFixture<CreateOptionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateOptionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateOptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});

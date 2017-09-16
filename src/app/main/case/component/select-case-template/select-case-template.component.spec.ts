import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectCaseTemplateComponent } from './select-case-template.component';

describe('SelectCaseTemplateComponent', () => {
  let component: SelectCaseTemplateComponent;
  let fixture: ComponentFixture<SelectCaseTemplateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelectCaseTemplateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectCaseTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});

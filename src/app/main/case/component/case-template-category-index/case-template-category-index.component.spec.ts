import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CaseTemplateCategoryIndexComponent } from './case-template-category-index.component';

describe('CaseTemplateCategoryIndexComponent', () => {
  let component: CaseTemplateCategoryIndexComponent;
  let fixture: ComponentFixture<CaseTemplateCategoryIndexComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CaseTemplateCategoryIndexComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CaseTemplateCategoryIndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CaseRuleComponent } from './case-rule.component';

describe('CaseRuleComponent', () => {
  let component: CaseRuleComponent;
  let fixture: ComponentFixture<CaseRuleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CaseRuleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CaseRuleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});

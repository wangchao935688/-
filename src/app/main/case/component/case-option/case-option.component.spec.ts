import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CaseOptionComponent } from './case-option.component';

describe('CaseOptionComponent', () => {
  let component: CaseOptionComponent;
  let fixture: ComponentFixture<CaseOptionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CaseOptionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CaseOptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});

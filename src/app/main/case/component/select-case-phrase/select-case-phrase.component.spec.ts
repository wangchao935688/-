import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectCasePhraseComponent } from './select-case-phrase.component';

describe('SelectCasePhraseComponent', () => {
  let component: SelectCasePhraseComponent;
  let fixture: ComponentFixture<SelectCasePhraseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelectCasePhraseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectCasePhraseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});

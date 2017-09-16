import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CommonThemeComponent } from './common-theme.component';

describe('CommonThemeComponent', () => {
  let component: CommonThemeComponent;
  let fixture: ComponentFixture<CommonThemeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CommonThemeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CommonThemeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});

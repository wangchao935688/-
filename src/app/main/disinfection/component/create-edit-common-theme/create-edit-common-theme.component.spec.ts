import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateEditCommonThemeComponent } from './create-edit-common-theme.component';

describe('CreateEditCommonThemeComponent', () => {
  let component: CreateEditCommonThemeComponent;
  let fixture: ComponentFixture<CreateEditCommonThemeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateEditCommonThemeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateEditCommonThemeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});

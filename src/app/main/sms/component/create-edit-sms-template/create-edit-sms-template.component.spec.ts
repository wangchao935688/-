import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateEditSmsTemplateComponent } from './create-edit-sms-template.component';

describe('CreateEditSmsTemplateComponent', () => {
  let component: CreateEditSmsTemplateComponent;
  let fixture: ComponentFixture<CreateEditSmsTemplateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateEditSmsTemplateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateEditSmsTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});

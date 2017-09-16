import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyTemplateListComponent } from './my-template-list.component';

describe('MyTemplateListComponent', () => {
  let component: MyTemplateListComponent;
  let fixture: ComponentFixture<MyTemplateListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyTemplateListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyTemplateListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});

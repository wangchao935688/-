import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SysTemplateListComponent } from './sys-template-list.component';

describe('SysTemplateListComponent', () => {
  let component: SysTemplateListComponent;
  let fixture: ComponentFixture<SysTemplateListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SysTemplateListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SysTemplateListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});

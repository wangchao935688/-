import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateEditSortClassComponent } from './create-edit-sort-class.component';

describe('CreateEditSortClassComponent', () => {
  let component: CreateEditSortClassComponent;
  let fixture: ComponentFixture<CreateEditSortClassComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateEditSortClassComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateEditSortClassComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateEditHostpialAccountComponent } from './create-edit-hostpial-account.component';

describe('CreateEditHostpialAccountComponent', () => {
  let component: CreateEditHostpialAccountComponent;
  let fixture: ComponentFixture<CreateEditHostpialAccountComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateEditHostpialAccountComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateEditHostpialAccountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});

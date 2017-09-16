import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MySortClassComponent } from './my-sort-class.component';

describe('MySortClassComponent', () => {
  let component: MySortClassComponent;
  let fixture: ComponentFixture<MySortClassComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MySortClassComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MySortClassComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});

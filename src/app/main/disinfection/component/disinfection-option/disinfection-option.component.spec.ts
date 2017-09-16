import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DisinfectionOptionComponent } from './disinfection-option.component';

describe('DisinfectionOptionComponent', () => {
  let component: DisinfectionOptionComponent;
  let fixture: ComponentFixture<DisinfectionOptionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DisinfectionOptionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DisinfectionOptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});

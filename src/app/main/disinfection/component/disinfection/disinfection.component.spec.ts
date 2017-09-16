import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DisinfectionComponent } from './disinfection.component';

describe('DisinfectionComponent', () => {
  let component: DisinfectionComponent;
  let fixture: ComponentFixture<DisinfectionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DisinfectionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DisinfectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});

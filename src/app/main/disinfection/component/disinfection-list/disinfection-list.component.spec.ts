import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DisinfectionListComponent } from './disinfection-list.component';

describe('DisinfectionListComponent', () => {
  let component: DisinfectionListComponent;
  let fixture: ComponentFixture<DisinfectionListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DisinfectionListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DisinfectionListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});

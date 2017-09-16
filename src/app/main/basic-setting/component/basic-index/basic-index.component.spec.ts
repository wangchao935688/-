import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BasicIndexComponent } from './basic-index.component';

describe('BasicIndexComponent', () => {
  let component: BasicIndexComponent;
  let fixture: ComponentFixture<BasicIndexComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BasicIndexComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BasicIndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});

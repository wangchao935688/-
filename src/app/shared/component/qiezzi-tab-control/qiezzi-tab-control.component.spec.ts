import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QiezziTabControlComponent } from './qiezzi-tab-control.component';

describe('QiezziTabControlComponent', () => {
  let component: QiezziTabControlComponent;
  let fixture: ComponentFixture<QiezziTabControlComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QiezziTabControlComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QiezziTabControlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});

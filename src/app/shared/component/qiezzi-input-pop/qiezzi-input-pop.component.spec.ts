import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QiezziInputPopComponent } from './qiezzi-input-pop.component';

describe('QiezziInputPopComponent', () => {
  let component: QiezziInputPopComponent;
  let fixture: ComponentFixture<QiezziInputPopComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QiezziInputPopComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QiezziInputPopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});

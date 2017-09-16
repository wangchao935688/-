import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QiezziRightHeaderComponent } from './qiezzi-right-header.component';

describe('QiezziRightHeaderComponent', () => {
  let component: QiezziRightHeaderComponent;
  let fixture: ComponentFixture<QiezziRightHeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QiezziRightHeaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QiezziRightHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});

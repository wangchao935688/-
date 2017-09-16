import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QiezziCenterHeaderComponent } from './qiezzi-center-header.component';

describe('QiezziCenterHeaderComponent', () => {
  let component: QiezziCenterHeaderComponent;
  let fixture: ComponentFixture<QiezziCenterHeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QiezziCenterHeaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QiezziCenterHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});

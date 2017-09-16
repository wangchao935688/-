import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QiezziHideDataComponent } from './qiezzi-hide-data.component';

describe('QiezziHideDataComponent', () => {
  let component: QiezziHideDataComponent;
  let fixture: ComponentFixture<QiezziHideDataComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QiezziHideDataComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QiezziHideDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});

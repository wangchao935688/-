import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QiezziNoDataComponent } from './qiezzi-no-data.component';

describe('QiezziNoDataComponent', () => {
  let component: QiezziNoDataComponent;
  let fixture: ComponentFixture<QiezziNoDataComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QiezziNoDataComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QiezziNoDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});

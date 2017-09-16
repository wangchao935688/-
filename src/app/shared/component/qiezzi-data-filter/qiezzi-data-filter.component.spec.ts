import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QiezziDataFilterComponent } from './qiezzi-data-filter.component';

describe('QiezziDataFilterComponent', () => {
  let component: QiezziDataFilterComponent;
  let fixture: ComponentFixture<QiezziDataFilterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QiezziDataFilterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QiezziDataFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});

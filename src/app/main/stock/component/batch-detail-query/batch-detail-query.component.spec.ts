import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BatchDetailQueryComponent } from './batch-detail-query.component';

describe('BatchDetailQueryComponent', () => {
  let component: BatchDetailQueryComponent;
  let fixture: ComponentFixture<BatchDetailQueryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BatchDetailQueryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BatchDetailQueryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});

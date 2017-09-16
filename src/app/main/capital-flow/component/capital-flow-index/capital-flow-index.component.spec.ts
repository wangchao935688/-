import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CapitalFlowIndexComponent } from './capital-flow-index.component';

describe('CapitalFlowIndexComponent', () => {
  let component: CapitalFlowIndexComponent;
  let fixture: ComponentFixture<CapitalFlowIndexComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CapitalFlowIndexComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CapitalFlowIndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});

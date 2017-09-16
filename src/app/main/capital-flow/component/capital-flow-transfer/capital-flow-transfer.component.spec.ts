import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CapitalFlowTransferComponent } from './capital-flow-transfer.component';

describe('CapitalFlowTransferComponent', () => {
  let component: CapitalFlowTransferComponent;
  let fixture: ComponentFixture<CapitalFlowTransferComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CapitalFlowTransferComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CapitalFlowTransferComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});

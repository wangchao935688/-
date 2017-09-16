import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PrintFeeComponent } from './print-fee.component';

describe('PrintFeeComponent', () => {
  let component: PrintFeeComponent;
  let fixture: ComponentFixture<PrintFeeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PrintFeeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PrintFeeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StockinfoComponent } from './stockinfo.component';

describe('StockinfoComponent', () => {
  let component: StockinfoComponent;
  let fixture: ComponentFixture<StockinfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StockinfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StockinfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});

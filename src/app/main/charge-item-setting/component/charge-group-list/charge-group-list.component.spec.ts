import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChargeGroupListComponent } from './charge-group-list.component';

describe('ChargeGroupListComponent', () => {
  let component: ChargeGroupListComponent;
  let fixture: ComponentFixture<ChargeGroupListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChargeGroupListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChargeGroupListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});

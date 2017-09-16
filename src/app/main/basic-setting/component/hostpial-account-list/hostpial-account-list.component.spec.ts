import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HostpialAccountListComponent } from './hostpial-account-list.component';

describe('HostpialAccountListComponent', () => {
  let component: HostpialAccountListComponent;
  let fixture: ComponentFixture<HostpialAccountListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HostpialAccountListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HostpialAccountListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});

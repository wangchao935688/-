import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyWorkloadComponent } from './my-workload.component';

describe('MyWorkloadComponent', () => {
  let component: MyWorkloadComponent;
  let fixture: ComponentFixture<MyWorkloadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyWorkloadComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyWorkloadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});

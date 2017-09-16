import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactWorkerListComponent } from './contact-worker-list.component';

describe('ContactWorkerListComponent', () => {
  let component: ContactWorkerListComponent;
  let fixture: ComponentFixture<ContactWorkerListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContactWorkerListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContactWorkerListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});

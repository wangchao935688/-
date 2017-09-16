import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateDictDetailComponent } from './create-dict-detail.component';

describe('CreateDictDetailComponent', () => {
  let component: CreateDictDetailComponent;
  let fixture: ComponentFixture<CreateDictDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateDictDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateDictDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountBasicComponent } from './account-basic.component';

describe('AccountBasicComponent', () => {
  let component: AccountBasicComponent;
  let fixture: ComponentFixture<AccountBasicComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AccountBasicComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountBasicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});

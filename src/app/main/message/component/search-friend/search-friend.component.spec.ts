import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchFriendComponent } from './search-friend.component';

describe('SearchFriendComponent', () => {
  let component: SearchFriendComponent;
  let fixture: ComponentFixture<SearchFriendComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchFriendComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchFriendComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});

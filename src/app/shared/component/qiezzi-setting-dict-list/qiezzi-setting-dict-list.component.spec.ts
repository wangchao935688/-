import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QiezziSettingDictListComponent } from './qiezzi-setting-dict-list.component';

describe('QiezziSettingDictListComponent', () => {
  let component: QiezziSettingDictListComponent;
  let fixture: ComponentFixture<QiezziSettingDictListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QiezziSettingDictListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QiezziSettingDictListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QiezziProvinceCityAreaComponent } from './qiezzi-province-city-area.component';

describe('QiezziProvinceCityAreaComponent', () => {
  let component: QiezziProvinceCityAreaComponent;
  let fixture: ComponentFixture<QiezziProvinceCityAreaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QiezziProvinceCityAreaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QiezziProvinceCityAreaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});

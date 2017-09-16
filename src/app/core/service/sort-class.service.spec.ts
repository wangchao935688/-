import { TestBed, inject } from '@angular/core/testing';

import { SortClassService } from './sort-class.service';

describe('SortClassService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SortClassService]
    });
  });

  it('should be created', inject([SortClassService], (service: SortClassService) => {
    expect(service).toBeTruthy();
  }));
});

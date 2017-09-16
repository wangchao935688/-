import { TestBed, inject } from '@angular/core/testing';

import { Stock.ServiceService } from './stock.service.service';

describe('Stock.ServiceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [Stock.ServiceService]
    });
  });

  it('should be created', inject([Stock.ServiceService], (service: Stock.ServiceService) => {
    expect(service).toBeTruthy();
  }));
});

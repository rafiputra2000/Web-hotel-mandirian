import { TestBed } from '@angular/core/testing';

import { HotelService } from './hotel-service.service';

describe('HotelServiceService', () => {
  let service: HotelService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HotelService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

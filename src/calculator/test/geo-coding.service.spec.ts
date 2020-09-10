import { TestBed } from '@angular/core/testing';

import { GeoCodingService } from './geo-coding.service';

describe('GeoCodingService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GeoCodingService = TestBed.get(GeoCodingService);
    expect(service).toBeTruthy();
  });
});

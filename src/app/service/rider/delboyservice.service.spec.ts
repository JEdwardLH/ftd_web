import { TestBed } from '@angular/core/testing';

import { DelboyserviceService } from './delboyservice.service';

describe('DelboyserviceService', () => {
  let service: DelboyserviceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DelboyserviceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

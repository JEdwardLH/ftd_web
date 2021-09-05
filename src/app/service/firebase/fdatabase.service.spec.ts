import { TestBed } from '@angular/core/testing';

import { FdatabaseService } from './fdatabase.service';

describe('FdatabaseService', () => {
  let service: FdatabaseService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FdatabaseService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

import { TestBed } from '@angular/core/testing';

import { KbankService } from './kbank.service';

describe('KbankService', () => {
  let service: KbankService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(KbankService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

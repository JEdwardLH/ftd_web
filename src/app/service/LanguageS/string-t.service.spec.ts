import { TestBed } from '@angular/core/testing';

import { StringTService } from './string-t.service';

describe('StringTService', () => {
  let service: StringTService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StringTService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

import { TestBed } from '@angular/core/testing';

import { MemotestApiService } from './memotest-api.service';

describe('MemotestApiService', () => {
  let service: MemotestApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MemotestApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

import { TestBed } from '@angular/core/testing';

import { AuthFactoryService } from './auth-factory.service';

describe('AuthFactoryService', () => {
  let service: AuthFactoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthFactoryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

import { TestBed } from '@angular/core/testing';

import { RegistryFactoryService } from './registry-factory.service';

describe('RegistryFactoryService', () => {
  let service: RegistryFactoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RegistryFactoryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

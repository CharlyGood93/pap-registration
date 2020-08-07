import { TestBed } from '@angular/core/testing';

import { RegistryProviderService } from './registry-provider.service';

describe('RegistryProviderService', () => {
  let service: RegistryProviderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RegistryProviderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

import { TestBed, inject } from '@angular/core/testing';

import { VillainService } from './villain.service';

describe('VillainService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [VillainService]
    });
  });

  it('should be created', inject([VillainService], (service: VillainService) => {
    expect(service).toBeTruthy();
  }));
});

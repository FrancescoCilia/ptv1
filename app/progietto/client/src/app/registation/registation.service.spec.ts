import { TestBed, inject } from '@angular/core/testing';

import { RegistationService } from './registation.service';

describe('RegistationService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RegistationService]
    });
  });

  it('should be created', inject([RegistationService], (service: RegistationService) => {
    expect(service).toBeTruthy();
  }));
});

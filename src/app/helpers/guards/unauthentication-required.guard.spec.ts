import { TestBed, async, inject } from '@angular/core/testing';

import { UnauthenticationRequiredGuard } from './unauthentication-required.guard';

describe('UnauthenticationRequiredGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UnauthenticationRequiredGuard]
    });
  });

  it('should ...', inject([UnauthenticationRequiredGuard], (guard: UnauthenticationRequiredGuard) => {
    expect(guard).toBeTruthy();
  }));
});

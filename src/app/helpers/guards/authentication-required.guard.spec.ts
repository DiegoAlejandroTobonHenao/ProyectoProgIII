import { TestBed, async, inject } from '@angular/core/testing';

import { AuthenticationRequiredGuard } from './authentication-required.guard';

describe('AuthenticationRequiredGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AuthenticationRequiredGuard]
    });
  });

  it('should ...', inject([AuthenticationRequiredGuard], (guard: AuthenticationRequiredGuard) => {
    expect(guard).toBeTruthy();
  }));
});

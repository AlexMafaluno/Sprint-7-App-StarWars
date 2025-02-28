import { TestBed } from '@angular/core/testing';
import { CanMatchFn } from '@angular/router';

import { AuthGuard } from './auth.guard';

describe('authGuard', () => {
  const executeGuard: CanMatchFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => AuthGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});

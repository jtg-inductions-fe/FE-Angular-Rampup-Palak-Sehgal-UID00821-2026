import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';
import { articleOwnerGuard } from './article-owner-guard';

describe('articleOwnerGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) =>
    TestBed.runInInjectionContext(() => articleOwnerGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});

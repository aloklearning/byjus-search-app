import { TestBed } from '@angular/core/testing';

import { UserAuthService } from './user-auth.service';

describe('UserAuthService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: UserAuthService = TestBed.get(UserAuthService);
    expect(service).toBeTruthy();
  });
});

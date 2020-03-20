import { TestBed } from '@angular/core/testing';

import { AuthorizerService } from './authorizer.service';

describe('AuthorizerService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AuthorizerService = TestBed.get(AuthorizerService);
    expect(service).toBeTruthy();
  });
});

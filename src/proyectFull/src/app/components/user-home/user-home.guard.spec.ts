import { TestBed, async, inject } from '@angular/core/testing';

import { UserHomeGuard } from './user-home.guard';

describe('UserHomeGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UserHomeGuard]
    });
  });

  it('should ...', inject([UserHomeGuard], (guard: UserHomeGuard) => {
    expect(guard).toBeTruthy();
  }));
});

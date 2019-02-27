import { TestBed } from '@angular/core/testing';

import { CanDeactivateNoteService } from './can-deactivate-note.service';

describe('CanDeactivateNoteService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CanDeactivateNoteService = TestBed.get(CanDeactivateNoteService);
    expect(service).toBeTruthy();
  });
});

import { TestBed } from '@angular/core/testing';

import { BackgroundMusicService } from './background-music.service';

describe('BackgroundMusicService', () => {
  let service: BackgroundMusicService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BackgroundMusicService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

import { TestBed } from '@angular/core/testing';

import { CursoDetailsService } from './curso-details.service';

describe('CursoDetailsService', () => {
  let service: CursoDetailsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CursoDetailsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

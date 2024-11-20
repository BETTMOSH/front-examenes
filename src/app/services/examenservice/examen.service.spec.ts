import { TestBed } from '@angular/core/testing';

import { ExamenService } from './examenservice/examen.service';

describe('ExamenService', () => {
  let service: ExamenService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ExamenService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

import { TestBed } from '@angular/core/testing';

import { NgxTimeSchedulerService } from './ngx-time-scheduler.service';

describe('NgxTimeSchedulerService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: NgxTimeSchedulerService = TestBed.get(NgxTimeSchedulerService);
    expect(service).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NgxTimeSchedulerComponent } from './ngx-time-scheduler.component';

describe('NgxTimeSchedulerComponent', () => {
  let component: NgxTimeSchedulerComponent;
  let fixture: ComponentFixture<NgxTimeSchedulerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NgxTimeSchedulerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NgxTimeSchedulerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

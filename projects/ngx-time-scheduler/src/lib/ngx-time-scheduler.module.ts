import { NgModule } from '@angular/core';
import { NgxTimeSchedulerComponent } from './ngx-time-scheduler.component';
import {CommonModule} from '@angular/common';

@NgModule({
  declarations: [NgxTimeSchedulerComponent],
  imports: [
    CommonModule
  ],
  exports: [NgxTimeSchedulerComponent]
})
export class NgxTimeSchedulerModule { }

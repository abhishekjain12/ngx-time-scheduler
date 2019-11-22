import { Injectable } from '@angular/core';
import {Subject} from 'rxjs';
import {Item} from './ngx-time-scheduler.model';

@Injectable({
  providedIn: 'root'
})
export class NgxTimeSchedulerService {

  public item = new Subject<Item>();
  public itemAdd = new Subject<Item>();
  public itemId = new Subject<number>();

  constructor() { }

  public itemPush(item: Item): void {
    this.itemAdd.next(item);
  }

  public itemPop(): void {
    this.item.next();
  }

  public itemRemove(id: number): void {
    this.itemId.next(id);
  }

}

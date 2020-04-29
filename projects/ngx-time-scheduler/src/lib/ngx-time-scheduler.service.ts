import { Injectable } from '@angular/core';
import {Subject} from 'rxjs';
import {Item, Section} from './ngx-time-scheduler.model';

@Injectable({
  providedIn: 'root'
})
export class NgxTimeSchedulerService {

  public item = new Subject<Item>();
  public itemAdd = new Subject<Item>();
  public itemId = new Subject<number>();
  public sectionAdd = new Subject<Section>();
  public section = new Subject<Section>();
  public sectionId = new Subject<number>();
  public refreshView = new Subject();

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

  public sectionPush(section: Section): void {
    this.sectionAdd.next(section);
  }

  public sectionPop(): void {
    this.section.next();
  }

  public sectionRemove(id: number): void {
    this.sectionId.next(id);
  }

  public refresh(): void {
    this.refreshView.next();
  }

}

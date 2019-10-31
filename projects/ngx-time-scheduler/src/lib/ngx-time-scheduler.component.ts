import {ChangeDetectorRef, Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import {HeaderDetailsModel, HeaderModel, ItemMeta, PeriodModel, ScheduleModel, SectionItem, TextModel} from './ngx-time-scheduler.model';
import * as moment_ from 'moment';

const moment = moment_;

@Component({
  selector: 'ngx-ts',
  templateUrl: './ngx-time-scheduler.component.html',
  styleUrls: ['./ngx-time-scheduler.component.css']
})
export class NgxTimeSchedulerComponent implements OnInit {
  @ViewChild('sectionTd') set SectionTd(elementRef: ElementRef) {
    this.SectionLeftMeasure = elementRef.nativeElement.clientWidth + 'px';
    this.changeDetector.detectChanges();
  }

  @Input() currentTimeFormat = 'DD-MMM-YYYY HH:mm';
  @Input() showCurrentTime = true;
  @Input() showGoto = true;
  @Input() showToday = true;
  // @Input() allowDragging = false;
  // @Input() allowResizing = false;
  // @Input() disableOnMove = true;
  @Input() showGotoModal = false;
  @Input() isBusinessDayOnly = false;
  @Input() HeaderFormat = 'Do MMM YYYY';
  @Input() MinRowHeight = 40;
  @Input() MaxHeight: string = null;
  @Input() text = new TextModel();
  @Input() getSchedule: ScheduleModel | any;
  @Input() start = moment().startOf('day');

  end = moment().endOf('day');
  currentTimeIndicatorPosition: string;
  currentTimeVisibility = 'visible';
  currentTimeTitle: string;
  ShowCurrentTimeHandle = null;
  SectionLeftMeasure = '0';
  currentPeriod: PeriodModel;
  currentPeriodMinuteDiff = 0;
  header: HeaderModel[];
  sectionItems: SectionItem[] = new Array<SectionItem>();

  constructor(private changeDetector: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.setSectionsInSectionItems();
    this.changePeriod(this.getSchedule.Periods[0]);
  }

  trackByFn(index, item) {
    return index;
  }

  setSectionsInSectionItems() {
    this.getSchedule.Sections.forEach(section => {
      const perSectionItem = new SectionItem();
      perSectionItem.section = section;
      perSectionItem.minRowHeight = this.MinRowHeight;
      this.sectionItems.push(perSectionItem);
    });
  }

  setItemsInSectionItems() {
    this.sectionItems.forEach(ele => {
      let itemCounts = 0;
      ele.itemMetas = new Array<ItemMeta>();
      ele.minRowHeight = this.MinRowHeight;

      this.getSchedule.Items.filter(i => {
        let itemMeta = new ItemMeta();

        if (i.sectionID === ele.section.id) {
          itemMeta.item = i;
          if (itemMeta.item.start <= this.end && itemMeta.item.end >= this.start) {

            itemMeta = this.itemMetaCal(itemMeta, itemCounts);
            itemCounts++;
            ele.minRowHeight = itemCounts * this.MinRowHeight;
            ele.itemMetas.push(itemMeta);
          }
        }
      });
    });
  }

  itemMetaCal(itemMeta: ItemMeta, itemCounts: number) {
    const foundStart = moment.max(itemMeta.item.start, this.start);

    itemMeta.cssTop = itemCounts * this.MinRowHeight;
    itemMeta.cssLeft = (foundStart.diff(this.start, 'minutes') / this.currentPeriodMinuteDiff) * 100;
    itemMeta.cssWidth = (
      Math.abs(foundStart.diff(moment.min(itemMeta.item.end, this.end), 'minutes')) / this.currentPeriodMinuteDiff
    ) * 100;

    if (itemMeta.item.start >= this.start) {
      itemMeta.isStart = true;
    }
    if (itemMeta.item.end <= this.end) {
      itemMeta.isEnd = true;
    }

    return itemMeta;
  }

  changePeriod(period: PeriodModel) {
    this.currentPeriod = period;
    const _start = this.start;
    this.end = moment(_start).add(this.currentPeriod.TimeFrameOverall, 'minutes').endOf('day');
    this.currentPeriodMinuteDiff = Math.abs(this.start.diff(this.end, 'minutes'));

    if (this.isBusinessDayOnly) {
      this.currentPeriodMinuteDiff -= (this.getNumberOfWeekendDays() * this.currentPeriod.TimeFramePeriod);
    }

    this.header = new Array<HeaderModel>();
    this.currentPeriod.TimeFrameHeaders.forEach(ele => {
      this.header.push(this.getDatesBetweenTwoDates(ele));
    });

    this.setItemsInSectionItems();
    this.showCurrentTimeIndicator();
  }

  showCurrentTimeIndicator = () => {
    if (this.ShowCurrentTimeHandle) {
      clearTimeout(this.ShowCurrentTimeHandle);
    }

    const currentTime = moment();
    if (currentTime >= this.start && currentTime <= this.end) {
      this.currentTimeVisibility = 'visible';
      this.currentTimeIndicatorPosition = (
        (Math.abs(this.start.diff(currentTime, 'minutes')) / this.currentPeriodMinuteDiff) * 100
      ) + '%';
      this.currentTimeTitle = currentTime.format(this.currentTimeFormat );
    } else {
      this.currentTimeVisibility = 'hidden';
    }

    this.ShowCurrentTimeHandle = setTimeout(this.ShowCurrentTimeHandle, 30000);
  }

  gotoToday() {
    this.start = moment().startOf('day');
    this.changePeriod(this.currentPeriod);
  }

  nextPeriod() {
    this.start.add(this.currentPeriod.TimeFrameOverall, 'minutes');
    this.changePeriod(this.currentPeriod);
  }

  previousPeriod() {
    this.start.subtract(this.currentPeriod.TimeFrameOverall, 'minutes');
    this.changePeriod(this.currentPeriod);
  }

  gotoDate(event: any) {
    this.showGotoModal = false;
    this.start = moment(event).startOf('day');
    this.changePeriod(this.currentPeriod);
  }

  getDatesBetweenTwoDates(format): HeaderModel {
    const now = moment(this.start);
    const dates = new HeaderModel();
    let prev: string;
    let colspan = 0;

    while (now.isBefore(this.end) || now.isSame(this.end)) {
      if (!this.isBusinessDayOnly || (now.day() !== 0 && now.day() !== 6)) {
        const headerDetails = new HeaderDetailsModel();
        headerDetails.name = now.format(format);
        if (prev && prev !== headerDetails.name) {
          colspan = 1;
        } else {
          colspan++;
          dates.headerDetails.pop();
        }
        prev = headerDetails.name;
        headerDetails.colspan = colspan;
        dates.headerDetails.push(headerDetails);
      }
      now.add(this.currentPeriod.TimeFramePeriod, 'minutes');
    }
    return dates;
  }

  getNumberOfWeekendDays() {
    const now = moment(this.start);
    let count = 0;

    while (now.isBefore(this.end) || now.isSame(this.end)) {
      if ((now.day() === 0 || now.day() === 6)) {
        count++;
      }
      now.add(this.currentPeriod.TimeFramePeriod, 'minutes');
    }
    return count;
  }

}

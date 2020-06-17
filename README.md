# Angular Time Scheduler
[![GitHub issues](https://img.shields.io/github/issues/abhishekjain12/ngx-time-scheduler.svg)](https://github.com/abhishekjain12/ngx-time-scheduler/issues)
[![GitHub forks](https://img.shields.io/github/forks/abhishekjain12/ngx-time-scheduler.svg)](https://github.com/abhishekjain12/ngx-time-scheduler/network)
[![GitHub stars](https://img.shields.io/github/stars/abhishekjain12/ngx-time-scheduler.svg)](https://github.com/abhishekjain12/ngx-time-scheduler/stargazers)
[![GitHub license](https://img.shields.io/github/license/abhishekjain12/ngx-time-scheduler.svg)](https://github.com/abhishekjain12/ngx-time-scheduler/blob/master/LICENSE)
[![latest](https://img.shields.io/npm/v/ngx-time-scheduler/latest.svg)](http://www.npmjs.com/package/ngx-time-scheduler) 
[![npm](https://img.shields.io/npm/dt/ngx-time-scheduler.svg)](https://www.npmjs.com/packagengx-time-scheduler)

A simple Angular Timeline Scheduler library


# Installation
Install via [NPM](https://npmjs.com)
```
npm i ngx-time-scheduler
```


# Getting Started
Import the `NgxTimeSchedulerModule` in your app module.
```typescript
import {NgxTimeSchedulerModule} from 'ngx-time-scheduler';

@NgModule({
  imports: [
    BrowserModule,
    NgxTimeSchedulerModule,
    ...
  ],
  ...
})
export class AppModule { }
```

Use `ngx-ts` in your `app-component.html` template.
```html
<ngx-ts
  [items]="items"
  [periods]="periods"
  [sections]="sections"
  [events]="events"
  [showBusinessDayOnly]="false"
  [allowDragging]="true"
></ngx-ts>
```

And in your `app.component.ts` component class:
```typescript
import {Component, OnInit} from '@angular/core';
import {Item, Period, Section, Events, NgxTimeSchedulerService} from 'ngx-time-scheduler';
import * as moment from 'moment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {
  events: Events = new Events();
  periods: Period[];
  sections: Section[];
  items: Item[];

  constructor(private service: NgxTimeSchedulerService) {}

  ngOnInit() {
    this.events.SectionClickEvent = (section) => { console.log(section); };
    this.events.ItemClicked = (item) => { console.log(item); };
    this.events.ItemDropped = (item) => { console.log(item); };

    this.periods = [
      {
        name: '3 days',
        timeFramePeriod: (60 * 3),
        timeFrameOverall: (60 * 24 * 3),
        timeFrameHeaders: [
          'Do MMM',
          'HH'
        ],
        classes: 'period-3day'
      }, {
        name: '1 week',
        timeFrameHeaders: ['MMM YYYY', 'DD(ddd)'],
        classes: '',
        timeFrameOverall: 1440 * 7,
        timeFramePeriod: 1440,
      }, {
        name: '2 week',
        timeFrameHeaders: ['MMM YYYY', 'DD(ddd)'],
        classes: '',
        timeFrameOverall: 1440 * 14,
        timeFramePeriod: 1440,
      }];

    this.sections = [{
      name: 'A',
      id: 1
    }, {
      name: 'B',
      id: 2
    }, {
      name: 'C',
      id: 3
    }, {
      name: 'D',
      id: 4
    }, {
      name: 'E',
      id: 5
    }];

    this.items = [{
      id: 1,
      sectionID: 1,
      name: 'Item 1',
      start: moment().startOf('day'),
      end: moment().add(5, 'days').endOf('day'),
      classes: ''
    }, {
      id: 2,
      sectionID: 3,
      name: 'Item 2',
      start: moment().startOf('day'),
      end: moment().add(4, 'days').endOf('day'),
      classes: ''
    }, {
      id: 3,
      sectionID: 1,
      name: 'Item 3',
      start: moment().add(1, 'days').startOf('day'),
      end: moment().add(3, 'days').endOf('day'),
      classes: ''
    }];

  }

  addItem() {
    this.service.itemPush({
      id: 4,
      sectionID: 5,
      name: 'Item 4',
      start: moment().startOf('day'),
      end: moment().add(3, 'days').endOf('day'),
      classes: ''
    });
  }

  popItem() {
    this.service.itemPop();
  }

  removeItem() {
    this.service.itemRemove(4);
  }

}
```

# Inputs
| Name                  | Required  | Type      | Default                   | Description   |
| ---                   | :---:     | ---       | ---                       | ---           |
| periods               | Yes       | Period[]  | `null`                    | An array of `Period` denoting what periods to display and use to traverse the calendar. |
| sections              | Yes       | Section[] | `null`                    | An array of `Section` to fill up the sections of the scheduler. |
| items                 | Yes       | Item[]    | `null`                    | An array of `Item` to fill up the items of the scheduler. |
| events                | No        | Events    | `new Events()`            | The events that can be hooked into. |
| currentTimeFormat     | No        | string    | `'DD-MMM-YYYY HH:mm'`     | The momentjs format to use for concise areas, such as tooltips. |
| showCurrentTime       | No        | boolean   | `true`                    | Whether the current time should be marked on the scheduler. |
| showGoto              | No        | boolean   | `true`                    | Whether the Goto button should be displayed. |
| showToday             | No        | boolean   | `true`                    | Whether the Today button should be displayed. |
| showBusinessDayOnly   | No        | boolean   | `false`                   | Whether business days only displayed (Sat-Sun). |
| allowDragging         | No        | boolean   | `false`                   | Whether or not dragging should be allowed. |
| headerFormat          | No        | string    | `'Do MMM YYYY'`           | The momentjs format to use for the date range displayed as a header. |
| minRowHeight          | No        | number    | `40`                      | The minimum height, in pixels, that a section should be. |
| maxHeight             | No        | number    | `null`                    | The maximum height of the scheduler. |
| text                  | No        | Text      | `new Text()`              | An object containing the text use in the scheduler, to be easily customized. |
| start                 | No        | moment    | `moment().startOf('day')` | The start time of the scheduler as a moment object. It's recommend to use `.startOf('day')`  on the moment for a clear starting point. |
| locale                | No        | string    | `` (empty === 'en')       | To load a locale, pass the key and the string values to `moment.locale`. By default, Moment.js uses English (United States) locale strings. |

**NOTE:** Date locale is currently not available for Goto(button) datepicker. It will apply a date locale as per the user's system setting. Feel free to provide suggestions.

# Methods

Object with properties which create periods that can be used to traverse the calendar.

| Name          | Parameter        | Return Type   | Description   |
| ---           | ---              | ---           | ---           |
| itemPush      | item: Item       | `void`        | Push the new item object into the existing one. |
| itemPop       | `None`           | `void`        | Pop the last item from the existing one.  |
| itemRemove    | id: number       | `void`        | Remove the item with defined item id from the existing one. |
| sectionPush   | section: Section | `void`        | Push the new section object into the existing one. |
| sectionPop    | `None`           | `void`        | Pop the last section from the existing one.  |
| sectionRemove | id: number       | `void`        | Remove the section with defined section id from the existing one. |
| refresh       | `None`           | `void`        | Refresh the scheduler view.  |


# Models

#### Period
Object with properties which create periods that can be used to traverse the calendar.

| Name                    | Type      | Required | Default   | Description   |
| ---                     | ---       | ---      | ---       | ---           |
| name                    | string    | Yes      | `null`    | The name is use to select the period and should be unique. |
| classes                 | string    | Yes      | `null`    | Any css classes you wish to add to this item.  |
| timeFramePeriod         | number    | Yes      | `null`    | The number of minutes between each "Timeframe" of the period. |
| timeFrameOverall        | number    | Yes      | `null`    | The total number of minutes that the period shows. |
| timeFrameHeaders        | string[]  | Yes      | `null`    | An array of [momentjs formats](http://momentjs.com/docs/#/displaying/format/) which is use to display the header rows at the top of the scheduler. Rather than repeating formats, the scheduler will merge all cells which are followed by a cell which shows the same date. For example, instead of seeing "Tuesday, Tuesday, Tuesday" with "3pm, 6pm, 9pm" below it, you'll instead see "Tuesday" a single time. |
| timeFrameHeadersTooltip | string[]  | No       | `null`    | An array of [momentjs formats](http://momentjs.com/docs/#/displaying/format/) which is use to display the tooltip of the header rows at the top of the scheduler. Rather than repeating formats, the scheduler will merge all cells which are followed by a cell which shows the same date. For example, instead of seeing "Tuesday, Tuesday, Tuesday" with "3pm, 6pm, 9pm" below it, you'll instead see "Tuesday" a single time. |
| tooltip                 | string    | No       | `null`    | It is use to display tooltip on period button. |

#### Section
Sections used to fill the scheduler.

| Name    | Type   | Required | Default | Description |
| ---     | ---    | ---      | ---     | ---         |
| id      | number | Yes      | `null`  | A unique identifier for the section. |
| name    | string | Yes      | `null`  | The name to display for the section. |
| tooltip | string | No       | `null`  | It is use to display tooltip for the section. |

#### Item
Items used to fill the scheduler.

| Name      | Type   | Required | Default | Description |
| ---       | ---    | ---      | ---     | ---         |
| id        | number | Yes      | `null`  | An identifier for the item (doesn't have to be unique, but may help you identify which item was interacted with). | 
| name      | string | Yes      | `null`  | The name to display for the item. |
| start     | any    | Yes      | `null`  | A Moment object denoting where this object starts. |
| end       | any    | Yes      | `null`  | A Moment object denoting where this object ends. |
| classes   | string | Yes      | `null`  | Any css classes you wish to add to this item. |
| sectionID | number | Yes      | `null`  | The ID of the section that this item belongs to. |
| tooltip   | string | No       | `null`  | It is use to display tooltip for the section. |

#### Text
An object containing the text use in the scheduler, to be easily customized.

| Name          | Type   | Default      |
| ---           | ---    | ---          |
| NextButton    | string | `'Next'`     |
| PrevButton    | string | `'Prev'`     |
| TodayButton   | string | `'Today'`    |
| GotoButton    | string | `'Go to'`    |
| SectionTitle  | string | `'Section'`  |

#### Events
A selection of events are provided to hook into when creating the scheduler, and are triggered with most interactions with items.

| Name                    | Parameters                               | Return type   | Description |
| ---                     | ---                                      | ---           | ---         |
| ItemClicked             | item: Item                               | void          | Triggered when an item is clicked. |
| ItemContextMenu         | item: Item, event: MouseEvent            | void          | Triggered when an item is righted click (Context Menu). |
| SectionClickEvent       | section: Section                         | void          | Triggered when a section is clicked. |
| SectionContextMenuEvent | section: Section, event: MouseEvent      | void          | Triggered when a section is righted click (Context Menu). |
| ItemDropped             | item: Item                               | void          | Triggered when an item is dropped onto a section. `item` is the new data after the action. |
| PeriodChange            | start: moment.Moment, end: moment.Moment | void          | Triggered when an period is change. |


**NOTE:** To prevent the default context menu of the browser, use event.preventDefault() in an event.ItemContextMenu() or event.SectionContextMenuEvent() function.

# Demo
[Demo](https://abhishekjain12.github.io/ngx-time-scheduler/)


# Credits
This time scheduler is based on the work done by [Zallist](https://github.com/Zallist/TimeScheduler).


# License
[MIT license](http://en.m.wikipedia.org/wiki/MIT_License)

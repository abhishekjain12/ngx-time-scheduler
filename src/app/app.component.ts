import {Component, OnInit} from '@angular/core';
import {Item, Period, Section, Events} from '../../projects/ngx-time-scheduler/src/lib/ngx-time-scheduler.model';
import * as moment from 'moment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  events: Events = new Events();
  periods: Period[];
  sections: Section[];
  items: Item[];

  constructor() {
    this.events.SectionClickEvent = (section) => {console.log(section); };
    this.events.ItemClicked = (item) => {console.log(item); };

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
    }, {
      name: 'F',
      id: 6
    }, {
      name: 'G',
      id: 7
    }];

    this.items = [{
      id: 1,
      sectionID: 1,
      name: 'Item 1',
      start: moment('2019-10-29'),
      end: moment('2019-10-29').add(5, 'days'),
      classes: ''
    }, {
      id: 2,
      sectionID: 3,
      name: 'Item 2',
      start: moment('2019-10-30'),
      end: moment('2019-10-30').add(4, 'days'),
      classes: ''
    }, {
      id: 3,
      sectionID: 1,
      name: 'Item 3',
      start: moment('2019-10-31').add(1, 'days'),
      end: moment('2019-10-31').add(3, 'days'),
      classes: ''
    }];

  }

  ngOnInit() {
  }

}

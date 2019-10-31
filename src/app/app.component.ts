import {Component, OnInit} from '@angular/core';
import {ScheduleModel} from '../../projects/ngx-time-scheduler/src/lib/ngx-time-scheduler.model';
import * as moment from 'moment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  getSchedule = new ScheduleModel();

  constructor() {
    this.setPeriod();
    this.setSections();
    this.setItems();
    this.getSchedule.events.SectionClickEvent = (section) => {console.log(section); };
    this.getSchedule.events.ItemClicked = (item) => {console.log(item); };
  }

  setPeriod() {
    this.getSchedule.Periods = [
      {
        Name: '3 days',
        TimeFramePeriod: (60 * 3),
        TimeFrameOverall: (60 * 24 * 3),
        TimeFrameHeaders: [
          'Do MMM',
          'HH'
        ],
        Classes: 'period-3day'
      }, {
        Name: '1 week',
        TimeFrameHeaders: ['MMM YYYY', 'DD(ddd)'],
        Classes: '',
        TimeFrameOverall: 1440 * 7,
        TimeFramePeriod: 1440,
      }, {
        Name: '2 week',
        TimeFrameHeaders: ['MMM YYYY', 'DD(ddd)'],
        Classes: '',
        TimeFrameOverall: 1440 * 14,
        TimeFramePeriod: 1440,
      }];
  }

  setSections() {
    this.getSchedule.Sections = [{
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
  }

  setItems() {
    this.getSchedule.Items = [{
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

  addItem(section) {
    const id = this.getSchedule.Items.length + 1;
    this.getSchedule.Items.push({
      id: id,
      sectionID: section.id,
      name: 'Item ' + id,
      start: moment('2019-10-24'),
      end: moment('2019-10-24').add(3, 'days'),
      classes: ''
    });
    const x = this.getSchedule;
    this.getSchedule = null;
    this.getSchedule = x;
  }

  // getData() {
  //   return this.getSchedule;
  // }

  ngOnInit() {
  }

}

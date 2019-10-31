export class ScheduleModel {
  Periods: PeriodModel[];
  Items: ItemModel[];
  Sections: SectionModel[];
  events: Events;

  constructor() {
    this.events = new Events();
  }
}

export class PeriodModel {
  Name: string;
  Classes: string;
  TimeFramePeriod: number;
  TimeFrameOverall: number;
  TimeFrameHeaders: string[];
}

export class ItemModel {
  id: number;
  name: string;
  start: any;
  end: any;
  classes: string;
  sectionID: number;
}

export class SectionModel {
  id: number;
  name: string;
}

export class SectionItem {
  section: SectionModel;
  minRowHeight: number;
  itemMetas: ItemMeta[];

  constructor() {
    this.itemMetas = new Array<ItemMeta>();
  }
}

export class ItemMeta {
  item: ItemModel;
  isStart: boolean;
  isEnd: boolean;
  cssTop: number;
  cssLeft: number;
  cssWidth: number;

  constructor() {
    this.cssTop = 0;
    this.cssLeft = 0;
    this.cssWidth = 0;
  }
}

export class HeaderModel {
  headerDetails: HeaderDetailsModel[];

  constructor() {
    this.headerDetails = new Array<HeaderDetailsModel>();
  }
}

export class HeaderDetailsModel {
  name: string;
  colspan: number;
}

export class TextModel {
  NextButton: string;
  PrevButton: string;
  TodayButton: string;
  GotoButton: string;
  SectionTitle: string;

  constructor() {
    this.NextButton = 'Next';
    this.PrevButton = 'Prev';
    this.TodayButton = 'Today';
    this.GotoButton = 'Go to';
    this.SectionTitle = 'Section';
  }
}

export class Events {
  // ItemMouseEnter: (item: ItemModel) => void;
  // ItemMouseLeave: (item: ItemModel) => void;
  // ItemDropped: (item: ItemModel, sectionID: string, start: any, end: any) => void;
  // ItemResized: (item: ItemModel, start: any, end: any) => void;
  // ItemMovement: (item: ItemModel, start: any, end: any) => void;
  // ItemMovementStart: (item: ItemModel, start: any, end: any) => void;
  // ItemMovementEnd: (item: ItemModel, start: any, end: any) => void;
  ItemClicked: (item: ItemModel) => void;
  SectionClickEvent: (section: SectionModel) => void;
}

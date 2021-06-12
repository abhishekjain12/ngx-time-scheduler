import * as moment from 'moment';

export class Period {
  name: string;
  classes: string;
  timeFramePeriod: number;
  timeFrameOverall: number;
  timeFrameHeaders: string[];
  timeFrameHeadersTooltip?: string[];
  tooltip?: string;
}

export class Item {
  id: number;
  name: string;
  start: moment.Moment;
  end: moment.Moment;
  classes: string;
  sectionID: number;
  tooltip?: string;
  metadata?: any;
}

export class Section {
  id: number;
  name: string;
  tooltip?: string;
}

export class Text {
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
  // ItemResized: (item: Item, start: any, end: any) => void;
  // ItemMovement: (item: Item, start: any, end: any) => void;
  // ItemMovementStart: (item: Item, start: any, end: any) => void;
  // ItemMovementEnd: (item: Item, start: any, end: any) => void;
  ItemDropped: (item: Item) => void;
  ItemClicked: (item: Item) => void;
  ItemContextMenu: (item: Item, event: MouseEvent) => void;
  SectionClickEvent: (section: Section) => void;
  SectionContextMenuEvent: (section: Section, event: MouseEvent) => void;
  PeriodChange: (start: moment.Moment, end: moment.Moment) => void;
}

export class SectionItem {
  section: Section;
  minRowHeight: number;
  itemMetas: ItemMeta[];

  constructor() {
    this.itemMetas = new Array<ItemMeta>();
  }
}

export class ItemMeta {
  item: Item;
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

export class Header {
  headerDetails: HeaderDetails[];

  constructor() {
    this.headerDetails = new Array<HeaderDetails>();
  }
}

export class HeaderDetails {
  name: string;
  colspan: number;
  tooltip?: string;
}

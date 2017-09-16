import {Component, OnInit, EventEmitter, Output, DoCheck} from "@angular/core";
import * as moment from "moment";
import {GeneralService} from "../../../core/service/general.service";
import {GlobalState} from "../../../global.state";
/**
 * 利润日期选择查询组件
 */
@Component({
  selector: 'qiezzi-select-date-slot',
  templateUrl: './qiezzi-select-date-slot.component.html',
  styleUrls: ['./qiezzi-select-date-slot.component.scss']
})
export class QiezziSelectDateSlotComponent implements OnInit {

  @Output()
  onSelectDate = new EventEmitter();

  date: Date = new Date;

  label: string;

  left: boolean;

  right: boolean;

  defaultDate: DoubleDate = {
    leftDate: moment(this.generalService.getServerTime()).format('YYYY-MM-DD'),
    rightDate: moment(this.generalService.getServerTime()).format('YYYY-MM-DD')
  };

  view: string = 'days';

  options: any = {
    leftOptions: {view: 'days', minView: 'days'},
    rightOptions: {view: 'days', minView: 'days'}
  };

  constructor(private generalService: GeneralService, private globalState: GlobalState) {
    this.globalState.subscribe('selectDateSlotChange', val => {
      if (val == 0) {
        this.left = true;
      }
      if (val == 1) {
        this.right = true;
      }
    })
  }

  ngOnInit() {
    this.defaultDate = {
      leftDate: moment(this.generalService.getServerTime()).format('YYYY-MM-DD'),
      rightDate: moment(this.generalService.getServerTime()).format('YYYY-MM-DD')
    }
  }

  selectLeft(evt: any) {
    if (evt) {
      this.defaultDate.leftDate = evt;
    } else {
      this.left = true;
    }
  }

  selectRight(evt: any) {
    if (evt) {
      this.defaultDate.rightDate = evt;
    } else {
      this.right = true;
    }
  }

  dateView(view: string) {
    this.left = false;
    this.right = false;
    this.view = view;
    if (view == 'days') {
      this.defaultDate = {
        rightDate: moment().format('YYYY-MM-DD'),
        leftDate: moment().format('YYYY-MM-DD')
      };
    }
    if (view == 'months') {
      this.defaultDate = {
        leftDate: moment().year() + '-' + (moment().month() + 1) + '-01',
        rightDate: moment().year() + '-' + (moment().month() + 1) + '-' + moment(moment(), "YYYY-MM").daysInMonth()
      };
    }
    if (view == 'years') {
      this.defaultDate = {
        leftDate: moment().year() + '-01-01',
        rightDate: moment().year() + '-12-31'
      };
    }
    this.options = {leftOptions: {view: view, minView: view}, rightOptions: {view: view, minView: view}};
    let date = {
      beginTime: moment(this.defaultDate.leftDate).format('YYYY-MM-DD'),
      endTime: moment(this.defaultDate.rightDate).format('YYYY-MM-DD')
    }
    this.onSelectDate.emit(date);
  }

  // 上
  prev() {
    if (this.view == 'days') {
      let day: number = (moment(this.defaultDate.rightDate).diff(moment(this.defaultDate.leftDate), 'days')) + 1;
      this.defaultDate = {
        rightDate: moment(this.defaultDate.rightDate).subtract(day, 'days').format('YYYY-MM-DD'),
        leftDate: moment(this.defaultDate.leftDate).subtract(day, 'days').format('YYYY-MM-DD')
      };
    } else if (this.view == 'years') {
      let day: number = (moment(this.defaultDate.rightDate).diff(moment(this.defaultDate.leftDate), 'years')) + 1;
      this.defaultDate = {
        rightDate: moment(this.defaultDate.rightDate).subtract(day, 'years').format('YYYY-MM-DD'),
        leftDate: moment(this.defaultDate.leftDate).subtract(day, 'years').format('YYYY-MM-DD')
      };
    } else {
      let day: number = (moment(this.defaultDate.rightDate).diff(moment(this.defaultDate.leftDate), 'months')) + 1;
      this.defaultDate = {
        rightDate: moment(this.defaultDate.rightDate).subtract(day, 'months').format('YYYY-MM-DD'),
        leftDate: moment(this.defaultDate.leftDate).subtract(day, 'months').format('YYYY-MM-DD')
      };
    }
    let date = {
      beginTime: moment(this.defaultDate.leftDate).format('YYYY-MM-DD'),
      endTime: moment(this.defaultDate.rightDate).format('YYYY-MM-DD')
    }
    this.onSelectDate.emit(date);
  }

  // 下
  next() {
    if (this.view == 'days') {
      let day: number = (moment(this.defaultDate.rightDate).diff(moment(this.defaultDate.leftDate), 'days')) + 1;
      this.defaultDate = {
        rightDate: moment(this.defaultDate.rightDate).add(day, 'days').format('YYYY-MM-DD'),
        leftDate: moment(this.defaultDate.leftDate).add(day, 'days').format('YYYY-MM-DD')
      };
    } else if (this.view == 'years') {
      let day: number = (moment(this.defaultDate.rightDate).diff(moment(this.defaultDate.leftDate), 'years')) + 1;
      this.defaultDate = {
        rightDate: moment(this.defaultDate.rightDate).add(day, 'years').format('YYYY-MM-DD'),
        leftDate: moment(this.defaultDate.leftDate).add(day, 'years').format('YYYY-MM-DD')
      };
    } else {
      let day: number = (moment(this.defaultDate.rightDate).diff(moment(this.defaultDate.leftDate), 'months')) + 1;
      this.defaultDate = {
        rightDate: moment(this.defaultDate.rightDate).add(day, 'months').format('YYYY-MM-DD'),
        leftDate: moment(this.defaultDate.leftDate).add(day, 'months').format('YYYY-MM-DD')
      };
    }
    let date = {
      beginTime: moment(this.defaultDate.leftDate).format('YYYY-MM-DD'),
      endTime: moment(this.defaultDate.rightDate).format('YYYY-MM-DD')
    }
    this.onSelectDate.emit(date);
  }

  search() {
    let date = {
      beginTime: moment(this.defaultDate.leftDate).format('YYYY-MM-DD'),
      endTime: moment(this.defaultDate.rightDate).format('YYYY-MM-DD')
    }
    this.onSelectDate.emit(date);
  }

}


export class DoubleDate {
  leftDate: string;
  rightDate: string;
}

import { Component, OnInit } from '@angular/core';
import {ApplicationService} from '../../../core/service/application.service';
import {GeneralService} from '../../../core/service/general.service';
import * as moment from 'moment';
import {UserService} from '../../../core/service/user.service';
import {CookieService} from 'ngx-cookie';

@Component({
  selector: 'app-my-sort-class',
  templateUrl: './my-sort-class.component.html',
  styleUrls: ['./my-sort-class.component.scss']
})
export class MySortClassComponent implements OnInit {
/*
* TODO 参数设置
* */
  timeSpan: any; // 时间范围，用于遍历生成表格
  dateSpan: any; // 年月日  数组
  validDate: any; // 周 数组
  classSpan: any; // 排班 数组
  today: string;
  isChooseMonth = true; // 默认选择月
  type = 'month'; // 设置当前时间类型，默认为当前月
  valueText: string; // 显示时间
  current: Date; // 当前时间
  weekList = [ '周一', '周二', '周三', '周四', '周五', '周六', '周日' ]; // week列表，用于生成表格头部
  weekHead = []; // 表格头部列表
  /*sortClassList = [
    {type: '早班', classList: []}
  ];*/
  displayStatus = ''; // 路由出口，仅布局用
  dataLoading = 'hide';
  scrollbarOptions = {axis: 'y', theme: 'minimal-dark'}; // 滚动条
  constructor(private application: ApplicationService,
              private generalService: GeneralService,
              private userService: UserService,
              private cookieService: CookieService) { }

  ngOnInit() {
    this.dateSpan = [];
    this.validDate = [];
    this.getCurrentRange(this.type);
    // this.getMyShiftList(); // 获取我的排班列表
  }
/*
* TODO 检查过去时间,用于置灰
* */
  checkTimePassed(date: string): boolean {
    return date === '' || (new Date(this.today + 'T00:00:00.000') > new Date(date + 'T00:00:00.000'));
  }
  /*
  * TODO 根据时间范围,生成表格
  * */
  onTimeSpanChange() {
    this.dateSpan.length = 0;
    this.validDate.length = 0;

    let start = new Date(this.timeSpan.start);
    let end = new Date(this.timeSpan.end);

    let prev = 1 - (start.getDay() || 7);

    let spanStart = moment(start).add(prev == 0 ? -7 : prev, 'days');
    let spanEnd = moment(end).add(7 - end.getDay(), 'days');

    while (spanStart.diff(spanEnd, 'ms') < 0) {
      this.dateSpan.push(spanStart.format('YYYY-MM') === moment(start).format('YYYY-MM') ? spanStart.format('YYYY-MM-DD') : '');
      this.validDate.push(spanStart.format('D'));
      spanStart = spanStart.add(1, 'days');
    }
    console.log(this.dateSpan);
    console.log(this.validDate);
    console.log(this.classSpan);
    while (!Array.isArray(this.dateSpan[0])) {
      this.dateSpan.push(this.dateSpan.splice(0, 7));
      this.validDate.push(this.validDate.splice(0, 7));
      this.classSpan.push(this.classSpan.splice(0, 7));
    }
  }
  /*
  * TODO 点击某天
  * */
  onCellClick(evt, date, indexRow, indexCol) {
    console.log(evt, date, indexRow, indexCol);
  }
  /*
  * TODO 点击切换周、月
  * */
  selectToothState(flag: boolean) {
    this.isChooseMonth = flag;
    if (flag) {
      // 选择月
      this.type = 'month';
    }else {
      // 选择周
      this.type = 'week';
    }
    this.getCurrentRange(this.type);
  }
  /**
   * TODO 获取我的排班
   */
  getMyShiftList() {
    this.classSpan = [];
    this.dataLoading = 'show';
    this.userService.getMyShiftList( {beginTime: this.timeSpan.start, endTime: this.timeSpan.end } ).subscribe(t => {
      this.dataLoading = 'hide';
      console.log(t);
      if (t && t.length > 0) {
        t.forEach( value => {// ?.TypeModel?.Name
          this.classSpan.push( value.TypeModel && value.TypeModel.Name );
        } );
        this.onTimeSpanChange();
      }
    });
  }
  /*
   * TODO 获取当前周/月，根据当前type
   * */
  getCurrentRange(type) {
    this.type = type;
    this.current = new Date(this.generalService.getServerTime());
    this.today = moment(this.current).format('YYYY-MM-DD');
    switch (type) {
      case 'week': {
        let start = moment(this.current).add(0 - this.current.getDay() + 1, 'days').format('YYYY-MM-DD');
        let end = moment(this.current).add(7 - this.current.getDay(), 'days').format('YYYY-MM-DD');
        this.valueText = start + ' 至 ' + end;
        this.timeSpan = { start: start, end: end};
        this.getWeekHead(moment(this.current).add(0 - this.current.getDay() + 1, 'days'));
        this.getMyShiftList();
        this.onTimeSpanChange();
        break;
      }
      case 'month': {
        let year = parseInt(moment(this.current).format('YYYY'), 10);
        let month = parseInt(moment(this.current).format('MM'), 10);
        let day = new Date(year, month, 0);
        let dayCount = day.getDate();

        let start = moment(this.current).add(0 - this.current.getDate() + 1, 'days').format('YYYY-MM-DD') + 'T00:00:00.000';
        let end = moment(this.current).add(dayCount - this.current.getDate(), 'days').format('YYYY-MM-DD') + 'T23:59:59.999';

        this.valueText = moment(this.current).format('YYYY-MM');
        this.timeSpan = {start: start, end: end};
        /*this.timeSpan. = ;
        this.timeSpan.end = ;*/
        this.getMyShiftList();
        break;
      }
    }
  }
  /*
   * TODO 获取指定周/月
   * */
  setCurrent(value: number) {
    if (value === 0) {
      this.current = new Date(this.generalService.getServerTime());
    }
    switch (this.type) {
      case 'week': {
        this.current = moment(this.current).add(value, 'weeks').toDate();
        let start = moment(this.current).add(0 - this.current.getDay() + 1, 'days').format('YYYY-MM-DD');
        let end = moment(this.current).add(7 - this.current.getDay(), 'days').format('YYYY-MM-DD');
        this.valueText = start + ' 至 ' + end;
        this.timeSpan = { start: start, end: end};
        this.getWeekHead(moment(this.current).add(0 - this.current.getDay() + 1, 'days'));
        this.getMyShiftList();
        this.onTimeSpanChange();
        break;
      }
      case 'month': {
        this.current = moment(this.current).add(value, 'months').toDate();

        let year = parseInt(moment(this.current).format('YYYY'), 10);
        let month = parseInt(moment(this.current).format('MM'), 10);
        let day = new Date(year, month, 0);
        let dayCount = day.getDate();

        let start = moment(this.current).add(0 - this.current.getDate() + 1, 'days').format('YYYY-MM-DD') + 'T00:00:00.000';
        let end = moment(this.current).add(dayCount - this.current.getDate(), 'days').format('YYYY-MM-DD') + 'T23:59:59.999';
        this.timeSpan = { start: start, end: end};
        this.valueText = moment(this.current).format('YYYY-MM');
        this.getMyShiftList();
        break;
      }
    }
  }
  /*
   * TODO 生成周列表head列表
   * */
  getWeekHead(start) {
    this.weekHead = [];
    for ( let i = 0; i < 7; i++) {
      this.weekHead.push( { date: moment(start).add(i, 'day').format('MM-DD'), label: this.weekList[i] } );
    }
  }
}


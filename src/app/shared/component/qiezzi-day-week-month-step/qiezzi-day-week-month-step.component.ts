import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import * as moment from "moment";
import {GeneralService} from "../../../core/service/general.service";


@Component({
  selector: 'app-qiezzi-day-week-month-step',
  templateUrl: './qiezzi-day-week-month-step.component.html',
  styleUrls: ['./qiezzi-day-week-month-step.component.scss']
})
export class QiezziDayWeekMonthStepComponent implements OnInit {
  @Input()
  type: string;

  @Output()
  onChange: EventEmitter<any>;

  buttonText: string;
  valueText: string;

  current: Date;

  constructor(private generalService: GeneralService) {
    this.onChange = new EventEmitter<any>();
  }

  ngOnInit() {
    this.current = new Date(this.generalService.getServerTime());
    switch (this.type) {
      case 'day': {
        this.buttonText = '今日';
        this.valueText = moment(this.current).format('YYYY-MM-DD');
        let start = moment(this.current).format('YYYY-MM-DD') + 'T00:00:00.000';
        let end = moment(this.current).format('YYYY-MM-DD') + 'T23:59:59.999';
        this.onChange.emit({first: true, start: start, end: end});
        break;
      }
      case 'week': {
        this.buttonText = '本周';
        let start = moment(this.current).add(0 - this.current.getDay() + 1, 'days').format('YYYY-MM-DD');
        let end = moment(this.current).add(7 - this.current.getDay(), 'days').format('YYYY-MM-DD');
        this.valueText = start + ' 至 ' + end;
        this.onChange.emit({first: true, start: start + 'T00:00:00.000', end: end + 'T23:59:59.999'});
        break;
      }
      case 'month': {
        this.buttonText = '本月';
        let year = parseInt(moment(this.current).format('YYYY'), 10);
        let month = parseInt(moment(this.current).format('MM'), 10);
        let day = new Date(year, month, 0);
        let dayCount = day.getDate();

        let start = moment(this.current).add(0 - this.current.getDate() + 1, 'days').format('YYYY-MM-DD') + 'T00:00:00.000';
        let end = moment(this.current).add(dayCount - this.current.getDate(), 'days').format('YYYY-MM-DD') + 'T23:59:59.999';

        this.valueText = moment(this.current).format('YYYY-MM');
        this.onChange.emit({first: true, start: start, end: end});

        break;
      }
    }
  }

  setCurrent(value: number) {
    if (value === 0) {
      this.current = new Date(this.generalService.getServerTime());
    }
    switch (this.type) {
      case 'day': {
        this.current = moment(this.current).add(value, 'days').toDate();
        this.valueText = moment(this.current).format('YYYY-MM-DD');
        let start = moment(this.current).format('YYYY-MM-DD') + 'T00:00:00.000';
        let end = moment(this.current).format('YYYY-MM-DD') + 'T23:59:59.999';
        this.onChange.emit({first: false, start: start, end: end});
        break;
      }
      case 'week': {
        this.current = moment(this.current).add(value, 'weeks').toDate();
        let start = moment(this.current).add(0 - this.current.getDay() + 1, 'days').format('YYYY-MM-DD');
        let end = moment(this.current).add(7 - this.current.getDay(), 'days').format('YYYY-MM-DD');
        this.valueText = start + ' 至 ' + end;
        this.onChange.emit({first: false, start: start + 'T00:00:00.000', end: end + 'T23:59:59.999'});
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

        this.valueText = moment(this.current).format('YYYY-MM');
        this.onChange.emit({first: false, start: start, end: end});
        break;
      }
    }
  }
}

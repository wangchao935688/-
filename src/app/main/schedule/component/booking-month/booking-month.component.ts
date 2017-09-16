import {Component, ElementRef, EventEmitter, OnInit, Output, ViewChild} from '@angular/core';

import * as moment from "moment";
import {GeneralService} from "../../../../core/service/general.service";
import {ApplicationService} from "../../../../core/service/application.service";
import {SelectItem} from "../../../../shared/component/qiezzi-drop-down-list/qiezzi-drop-down-list.component";
import {BookingScheduleListRequest} from "../../../../core/messages/booking-request-response";
import {BookingSchedule_AimModel} from "../../../../core/messages/model/booking.model";
import {BookingService} from "../../../../core/service/booking.service";
import {WorkerService} from "../../../../core/service/worker.service";
import {CustomizeSliderService} from "../../../../core/service/customize-slider.service";
import {ActivatedRoute, Router} from "@angular/router";
import {WorkerSimple} from "../../../../core/messages/model/worker_simple";
import {CreateEditBookingComponent} from "../create-edit-booking/create-edit-booking.component";
import {PopupWindowSize} from "../../../../shared/component/qiezzi-popup-window/popup-window/popup-window.component";

@Component({
  selector: 'app-booking-month',
  templateUrl: './booking-month.component.html',
  styleUrls: ['./booking-month.component.scss']
})
export class BookingMonthComponent implements OnInit {
  timeSpan: any;
  dateSpan: any;
  validDate: any;
  days: any;

  today: string;
  todayTime: Date;
  bookingScheduleType: SelectItem[] = [{label: '全部类型', value: 0}, {label: '预约', value: 1}, {label: '日程', value: 2}];
  doctorList: WorkerSimple[];
  doctorCodeList: { [key: string]: number };
  doctorListDataSource: SelectItem[];

  data: any;
  listData: BookingSchedule_AimModel[];

  dataType: number = 0;

  @Output()
  onSliderOpen: EventEmitter<string[]> = new EventEmitter();

  @ViewChild('bookingScheduleList')
  bookingScheduleList: ElementRef;

  ngOnInit() {
    this.todayTime = new Date(this.generalService.getServerTime());
    this.today = moment(this.todayTime).format('YYYY-MM-DD');

    this.dateSpan = [];
    this.validDate = [];

    let tmp: SelectItem[] = [];
    this.workerService.getGetList({workerTypeArray: [0]}).subscribe(t => {
      this.doctorList = t;

      for (let i = 0; i < this.doctorList.length; i++) {
        this.doctorCodeList[this.doctorList[i].WorkerCode] = i;
        tmp.push({label: this.doctorList[i].WorkerName, value: this.doctorList[i].WorkerId})
      }

      this.doctorListDataSource = tmp;
    });
  }

  constructor(private generalService: GeneralService,
              private application: ApplicationService,
              private workerService: WorkerService,
              private bookingService: BookingService) {
  }


  clearBookingScheduleItem() {
    let dateCell = this.bookingScheduleList.nativeElement.querySelectorAll('booking-schedule-list');
    for (let i = 0; i < dateCell.length; i++) {
      for (let k = 0; k < dateCell[i].childNodes.length; k++) {
        let item: HTMLDivElement = dateCell[i].childNodes[k];
        item.onclick = null;
        item.ondragstart = null;
        item.ondragend = null;
        item.parentNode.removeChild(item);
      }
    }
  }

  getBookingScheduleList(type: number, start: string, end: string) {
    let request: BookingScheduleListRequest = new BookingScheduleListRequest();
    request.type = type;
    request.pageSize = 9999;
    request.pageIndex = 1;
    request.start = start;//moment(new Date()).format('YYYY-MM-DD') + 'T00:00:00.000';
    request.end = end;//moment(new Date()).add(1, 'days').format('YYYY-MM-DD') + 'T23:59:59.999';
    this.bookingService.getBookingScheduleList(request).subscribe(t => {
      this.data = t;
      this.listData = this.data.Items;
      for (let i = 0; i < this.listData.length; i++) {
        this.days[moment(this.listData[i].StartTime).format('YYYY-MM-DD')].push(this.listData[i]);
      }

      let divNodeList = (<HTMLDivElement>this.bookingScheduleList.nativeElement).querySelectorAll('.booking-schedule-list');
      for (let i = 0; i < divNodeList.length; i++) {
        if (divNodeList[i].getAttribute('data-date') !== '') {
          let dataList = this.days[divNodeList[i].getAttribute('data-date')] || [];
          for (let j = 0; j < dataList.length; j++) {
            divNodeList[i].appendChild(this.createBookingScheduleItem(dataList[j]));
          }
        }
      }
    })
  }

  createBookingScheduleItem(aimModel: BookingSchedule_AimModel): HTMLDivElement {
    let self = this;
    let divBookingScheduleTmp = document.createElement('div');

    divBookingScheduleTmp.onclick = function (event: MouseEvent) {
      event.stopImmediatePropagation();
      event.stopPropagation();
      event.preventDefault();
      let ele: HTMLDivElement = (<HTMLDivElement>event.target);
      self.onSliderOpen.emit([ele.getAttribute('bind-type') + '-detail', ele.getAttribute('bind-src')]);
    };

    divBookingScheduleTmp.setAttribute('class', 'booking-schedule-item');
    divBookingScheduleTmp.setAttribute('bind-src', aimModel.Id);
    divBookingScheduleTmp.setAttribute('bind-doctor', aimModel.DoctorCode);
    divBookingScheduleTmp.setAttribute('bind-type', aimModel.Type === 1 ? 'booking' : 'schedule');

    divBookingScheduleTmp.innerText = (aimModel.Type === 1 ? this.getSimplePatientData(aimModel) : aimModel.Name);

    return divBookingScheduleTmp;
  }

  getSimplePatientData(aimModel: BookingSchedule_AimModel) {
    return aimModel.Patient.PatientName
      + '('
      + moment(aimModel.StartTime).format('HH:mm')
      + '-'
      + moment(aimModel.EndTime).format('HH:mm')
      + ')';
  }

  checkTimePassed(date: string): boolean {
    return date === '' || (new Date(this.today + 'T00:00:00.000') > new Date(date + 'T00:00:00.000'));
  }

  onTimeSpanChange(evt) {
    this.timeSpan = evt;

    this.dateSpan.length = 0;
    this.validDate.length = 0;
    this.days = {};

    let start = new Date(this.timeSpan.start);
    let end = new Date(this.timeSpan.end);

    let prev = 1 - (start.getDay() || 7);

    let spanStart = moment(start).add(prev == 0 ? -7 : prev, 'days');
    let spanEnd = moment(end).add(7 - end.getDay(), 'days');

    while (spanStart.diff(spanEnd, 'ms') < 0) {
      this.validDate.push(spanStart.format('D'));
      if (spanStart.format('YYYY-MM') === moment(start).format('YYYY-MM')) {
        this.days[spanStart.format('YYYY-MM-DD')] = [];
        this.dateSpan.push(spanStart.format('YYYY-MM-DD'));
      } else {
        this.dateSpan.push('');
      }

      spanStart = spanStart.add(1, 'days');
    }

    while (!Array.isArray(this.dateSpan[0])) {
      this.dateSpan.push(this.dateSpan.splice(0, 7));
      this.validDate.push(this.validDate.splice(0, 7));
    }

    this.getBookingScheduleList(0, this.timeSpan.start, this.timeSpan.end);
  }

  onCellClick(event: MouseEvent, date: string) {
    if ((event.srcElement || event['originalTarget']).className === 'passed'
      || (event.srcElement || event['originalTarget']).className === 'day-cell-txt'
      || (event.srcElement || event['originalTarget']).className === 'booking-schedule-list'
      || (event.srcElement || event['originalTarget']).className === 'passed no-current-month') {
      return;
    }
    this.application.frontLayer.openPopupWindow(CreateEditBookingComponent, '新增预约', PopupWindowSize.MIDDLE, 810, {model: {VisitDate: date}}).subscribe(t => {
      console.log(t);
    });
  }

  onTypeChange(index) {
    this.dataType = index;
    this.clearBookingScheduleItem();
    this.getBookingScheduleList(this.dataType, this.timeSpan.start, this.timeSpan.end);
  }


  onDoctorSelectChange(index) {
  }
}

import {Component, ElementRef, EventEmitter, OnInit, Output, ViewChild} from '@angular/core';
import {GeneralService} from "../../../../core/service/general.service";
import {ApplicationService} from "../../../../core/service/application.service";
import {CreateEditBookingComponent} from "../create-edit-booking/create-edit-booking.component";
import {PopupWindowSize} from "../../../../shared/component/qiezzi-popup-window/popup-window/popup-window.component";

import * as moment from "moment";
import {
  BookingScheduleListRequest, SaveBookingRequest,
  Schedule_Add
} from "../../../../core/messages/booking-request-response";
import {WorkerService} from "../../../../core/service/worker.service";
import {BookingService} from "../../../../core/service/booking.service";
import {CustomizeSliderService} from "../../../../core/service/customize-slider.service";
import {ActivatedRoute, Router} from "@angular/router";
import {BookingSchedule_AimModel} from "../../../../core/messages/model/booking.model";
import {SelectItem} from "../../../../shared/component/qiezzi-drop-down-list/qiezzi-drop-down-list.component";
import {WorkerSimple} from "../../../../core/messages/model/worker_simple";

@Component({
  selector: 'app-booking-week',
  templateUrl: './booking-week.component.html',
  styleUrls: ['./booking-week.component.scss']
})
export class BookingWeekComponent implements OnInit {
  DayMilliseconds = 1000 * 60 * 60 * 24;
  TimeZoneMilliseconds = 1000 * 60 * 60 * 8;
  OneMinuteMilliseconds = 1000 * 60;

  timeRows: string[];
  isToday: number;
  currentTime: string;
  timeLineBottom: any[];
  today: Date;

  dragItem: any;

  timeSpan: any;
  dateSpan: any;
  days: any;
  handlers: { [key: string]: EventListener };

  bookingScheduleType: SelectItem[] = [{label: '全部类型', value: 0}, {label: '预约', value: 1}, {label: '日程', value: 2}];
  doctorList: WorkerSimple[];
  doctorCodeList: { [key: string]: number };
  doctorListDataSource: SelectItem[];

  data: any;
  listData: BookingSchedule_AimModel[];

  @Output()
  onSliderOpen: EventEmitter<string[]> = new EventEmitter();

  @ViewChild('bookingScheduleList')
  bookingScheduleList: ElementRef;

  constructor(private generalService: GeneralService,
              private application: ApplicationService,
              private workerService: WorkerService,
              private bookingService: BookingService) {
  }

  ngOnInit() {
    let tmp: SelectItem[] = [];
    this.workerService.getGetList({workerTypeArray: [0]}).subscribe(t => {
      this.doctorList = t;

      for (let i = 0; i < this.doctorList.length; i++) {
        this.doctorCodeList[this.doctorList[i].WorkerCode] = i;
        tmp.push({label: this.doctorList[i].WorkerName, value: this.doctorList[i].WorkerId})
      }

      this.doctorListDataSource = tmp;
    });

    this.today = new Date(this.generalService.getServerTime());
    let count = this.today.getDay() - 1;

    this.dateSpan = [];
    this.handlers = {};

    this.timeLineBottom = [{}, {}, {}, {}, {}, {}, {}];
    for (let i = 0; i < 7; i++) {
      if (i < count) {
        this.timeLineBottom[i]['top'] = '0';
      }
      else if (i === count) {
        this.isToday = i;
        this.currentTime = moment(this.today).format('HH:mm');
        this.timeLineBottom[this.isToday]['bottom'] = (((this.DayMilliseconds - (( this.today.getTime() + this.TimeZoneMilliseconds) % this.DayMilliseconds)) / this.DayMilliseconds) * 100) + '%';
      }
      else {
        this.timeLineBottom[i]['top'] = '-100%';
      }
    }
    this.timeRows = ["00:00", "00:30", "01:00", "01:30", "02:00", "02:30", "03:00", "03:30", "04:00", "04:30", "05:00", "05:30", "06:00", "06:30", "07:00", "07:30", "08:00", "08:30", "09:00", "09:30", "10:00", "10:30", "11:00", "11:30", "12:00", "12:30", "13:00", "13:30", "14:00", "14:30", "15:00", "15:30", "16:00", "16:30", "17:00", "17:30", "18:00", "18:30", "19:00", "19:30", "20:00", "20:30", "21:00", "21:30", "22:00", "22:30", "23:00", "23:30"];

    setInterval(() => {
      this.today = new Date(this.generalService.getServerTime());
      this.currentTime = moment(this.today).format('HH:mm');
      this.timeLineBottom[this.isToday]['bottom'] = (((this.DayMilliseconds - (( this.today.getTime() + this.TimeZoneMilliseconds) % this.DayMilliseconds)) / this.DayMilliseconds) * 100) + '%';
    }, this.OneMinuteMilliseconds);
  }

  onCellDown(evt, dayIndex, time) {
    console.log(dayIndex, time)
  }

  onCellUp(evt, dayIndex, time) {
    console.log(dayIndex, time)

    this.application.frontLayer.openPopupWindow(CreateEditBookingComponent, '新增预约', PopupWindowSize.MIDDLE, 810, null).subscribe(t => {
      console.log(t);
    });
  }

  createTempItemBlock() {
    let divBookingTmp = document.createElement('div');
    divBookingTmp.style.width = '100%';
    divBookingTmp.style.position = 'absolute';
    divBookingTmp.style.backgroundColor = '#9599FB';
    divBookingTmp.style.opacity = '0.5';
    return divBookingTmp;
  }

  onColDown(event, day) {
    if ((event.srcElement || event['originalTarget']) !== event.currentTarget)
      return;
    let startPos = Math.floor(event.offsetY / 60);

    let date = new Date(), begin = day + 'T' + this.timeRows[startPos];
    let time1 = Date.parse(begin), time2 = date.getTime();

    if (time1 < time2) {
      console.log('时间已过');
      return;
    }
    let
      self = this,
      offsetY,
      startY = event.offsetY,
      divBookingTmp = this.createTempItemBlock(),
      startOffsetY = event.clientY;

    divBookingTmp.style.top = (startPos * 60) + 'px';

    (event.srcElement || event['originalTarget']).appendChild(divBookingTmp);

    function clearMouseUp(bool) {
      if (bool) {
        let timeSpan = parseInt(divBookingTmp.style.height.replace('px', ''), 10) / 60;
        console.log(self.timeRows[startPos], self.timeRows[startPos + timeSpan] || '23:59');

        self.application.frontLayer.openPopupWindow(CreateEditBookingComponent, '新增预约', PopupWindowSize.MIDDLE, 810, {
          model: {
            StartTime: self.timeRows[startPos],
            EndTime: self.timeRows[startPos + timeSpan] || '23:59',
            VisitDate: day
          }
        }).subscribe(t => {
          console.log(t);
        });
      }

      document.onmousemove = null;
      document.onmouseup = null;
      divBookingTmp.onmouseup = null;
      (event.srcElement || event['originalTarget'])['onmouseup'] = null;
      (event.srcElement || event['originalTarget']).removeChild(divBookingTmp);
    }

    (event.srcElement || event['originalTarget'])['onmouseup'] = function (event1: MouseEvent) {
      clearMouseUp(true);
    };
    divBookingTmp.onmouseup = function (event1: MouseEvent) {
      clearMouseUp(true);
    };
    document.onmouseup = function (event1: MouseEvent) {
      clearMouseUp(true);
    };
    document.onmousemove = function (event1: MouseEvent) {
      let currentOffsetY = event1.clientY;
      offsetY = currentOffsetY - startOffsetY;
      if (offsetY < -5) {
        clearMouseUp(false);
        return;
      }

      divBookingTmp.style.height = ((Math.ceil((offsetY + startY ) / 60) - startPos) * 60) + 'px';
    };
  }

  onTimeSpanChange(evt) {
    this.timeSpan = evt;

    this.dateSpan.length = 0;
    this.days = {};

    let spanStart = moment(new Date(this.timeSpan.start));
    let spanEnd = moment(new Date(this.timeSpan.end));

    while (spanStart.diff(spanEnd, 'ms') < 0) {
      this.days[spanStart.format('YYYY-MM-DD')] = [];
      this.dateSpan.push(spanStart.format('YYYY-MM-DD'));
      spanStart = spanStart.add(1, 'days');
    }

    this.getBookingScheduleList(0, this.timeSpan.start, this.timeSpan.end);
  }


  getBookingScheduleList(type: number, start: string, end: string) {
    let request: BookingScheduleListRequest = new BookingScheduleListRequest();
    request.type = type;
    request.pageSize = 9999;
    request.pageIndex = 1;
    request.start = start;
    request.end = end;
    this.bookingService.getBookingScheduleList(request).subscribe(t => {
      this.data = t;
      this.listData = this.data.Items;
      for (let i = 0; i < this.listData.length; i++) {
        this.days[moment(this.listData[i].StartTime).format('YYYY-MM-DD')].push(this.listData[i]);
      }

      let divNodeList = (<HTMLDivElement>this.bookingScheduleList.nativeElement).querySelectorAll('.booking-schedule-container');
      for (let i = 0; i < divNodeList.length; i++) {
        let day = divNodeList[i].getAttribute('bind-date'), dataList = this.days[day];
        for (let j = 0; j < dataList.length; j++) {
          divNodeList[i].appendChild(this.createBookingScheduleItem(dataList[j], <HTMLDivElement>divNodeList[i], day));
        }
      }
    })
  }

  createBookingScheduleItem(aimModel: BookingSchedule_AimModel, ele: HTMLDivElement, date: string): HTMLDivElement {
    let self = this;
    let timeSpan = moment(aimModel.EndTime).diff(moment(aimModel.StartTime), 'minute') / 30;
    let timeStartString = moment(aimModel.StartTime).format('YYYY-MM-DD') + 'T00:00:00.000';
    let timeStartRow = moment(aimModel.StartTime).diff(moment(new Date(timeStartString)), 'minute') / 30;

    let divBookingScheduleTmp = document.createElement('div');

    divBookingScheduleTmp.onclick = function (event: MouseEvent) {
      event.stopImmediatePropagation();
      event.stopPropagation();
      event.preventDefault();
      let ele: HTMLDivElement = (<HTMLDivElement>event.target);
      self.onSliderOpen.emit([ele.getAttribute('bind-type') + '-detail', ele.getAttribute('bind-src')]);
    };

    divBookingScheduleTmp.draggable = ((aimModel.Status !== 3) && (aimModel.Status !== -1));
    divBookingScheduleTmp.style.position = 'absolute';
    divBookingScheduleTmp.style.left = '0';
    divBookingScheduleTmp.style.top = (timeStartRow * 60) + 'px';
    divBookingScheduleTmp.style.height = (timeSpan * 60 - 1) + 'px';
    divBookingScheduleTmp.style.lineHeight = (timeSpan * 60) + 'px';
    divBookingScheduleTmp.style.textAlign = 'center';

    divBookingScheduleTmp.setAttribute('id', (aimModel.Type === 1 ? 'booking-' : 'schedule-') + aimModel.Id);
    divBookingScheduleTmp.setAttribute('class', 'booking-schedule-item');
    divBookingScheduleTmp.setAttribute('bind-src', aimModel.Id);
    divBookingScheduleTmp.setAttribute('bind-doctor', aimModel.DoctorCode);
    divBookingScheduleTmp.setAttribute('bind-type', aimModel.Type === 1 ? 'booking' : 'schedule');

    divBookingScheduleTmp.innerText = (aimModel.Type === 1 ? aimModel.Patient.PatientName : aimModel.Name);

    if (aimModel.Type === 1) {
      divBookingScheduleTmp.setAttribute('bind-patient', aimModel.Patient.Id);
      divBookingScheduleTmp.setAttribute('bind-doctor', aimModel.DoctorCode);
    }

    divBookingScheduleTmp.ondragstart = function (event: DragEvent) {
      self.dragItem = {
        ele: (event.srcElement || event['originalTarget']),
        type: (event.srcElement || event['originalTarget']).getAttribute('bind-type'),
        id: (event.srcElement || event['originalTarget']).getAttribute('bind-src'),
        patient: (event.srcElement || event['originalTarget']).getAttribute('bind-patient'),
        doctor: (event.srcElement || event['originalTarget']).getAttribute('bind-doctor'),
        timeSpan: timeSpan
      };
      event.dataTransfer.setData('Text', (event.srcElement || event['originalTarget']).getAttribute('id'));
      event.dataTransfer.effectAllowed = 'move';
    };
    divBookingScheduleTmp.ondragend = function (event5: DragEvent) {
      event5.preventDefault();
    };

    divBookingScheduleTmp.style.zIndex = '10000';
    ele.appendChild(divBookingScheduleTmp);

    return divBookingScheduleTmp;
  }

  onDrop(event: DragEvent) {
    let date = (<Element>(event.currentTarget)).getAttribute('bind-date');
    console.log(event.dataTransfer.getData('Text'));

    let temp1 = moment(date + ' 00:00:00.000');
    temp1.add(Math.floor(event.offsetY / 60) * 30, 'minutes');
    let num1 = temp1.diff(new Date(), 'minutes');
    if (num1 < 1) {
      console.log('过时');
      return;
    }

    if (this.dragItem.type === 'booking') {
      let request: SaveBookingRequest = new SaveBookingRequest();
      request.Id = this.dragItem.id;
      request.PatientID = this.dragItem.patient;
      request.TableType = 1;
      request.DoctorCode = this.dragItem.doctor === 'null' ? null : this.dragItem.doctor;
      request.StartTime = (event.srcElement || event['originalTarget']).getAttribute('bind-date') + 'T' + moment(temp1).format('HH:mm');
      request.EndTime = (event.srcElement || event['originalTarget']).getAttribute('bind-date') + 'T' + moment(temp1).add(this.dragItem.timeSpan * 30, 'minutes').format('HH:mm');
      this.bookingService.postBookingSaveBooking(request).subscribe(t => {
        (event.srcElement || event['originalTarget']).appendChild(this.dragItem.ele);
        this.dragItem.ele.style.top = (Math.floor(event.offsetY / 60) * 60) + 'px';
        this.dragItem.ele.style.transition = 'top 0.2s';
        this.dragItem = null;
        this.application.main.openPromptMessage('保存成功！');
      })
    } else {
      let request: Schedule_Add = new Schedule_Add();
    }
  }

  onDragOver(event: DragEvent) {
    event.preventDefault();
  }

  onTypeChange(value) {

  }

  onDoctorSelectChange(value) {

  }
}
